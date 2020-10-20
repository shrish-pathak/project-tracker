const bcrypt = require('bcryptjs')
const UserSchema = require('../models/USER')
const jwtToken = require('jsonwebtoken')
const keys = require('../config/keys')
const validateLoginInput = require('../validation/login')
const validateRegisterInput = require('../validation/register')

module.exports = {
    loginHandler: (req, res) => {
        const { errors, isValid } = validateLoginInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        UserSchema.findOne({ email }).then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        email: req.body.email
                    };

                    jwtToken.sign(
                        payload,
                        keys.secretKey,
                        // Tell the key to expire in one hour
                        { expiresIn: 86400 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        });
                } else {
                    return res.status(400).json({ password: 'Incorrect password' });
                }
            });
        });

    },

    registerHandler: async (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const user = await UserSchema.findOne({ email: req.body.email }).lean(true)



        const newUser = new UserSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });


        if (user) {
            if (user.email === req.body.email) {
                user.password = req.body.password
                guestLogin(user, res)
                return
            }
            return res.status(400).json({ email: 'A user has already registered with this address' })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) console.log(err);
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email
                        };

                        jwtToken.sign(
                            payload,
                            keys.secretKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).send(err)
                    });
            });
        });

    },
    getUsers: (req, res) => {
        UserSchema.find().select({ email: 1, username: 1, firstName: 1, lastName: 1, _id: 0 }).then(users => {
            res.status(200).json(users)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }

}

function guestLogin(guest, res) {

    const email = guest.email;
    const password = guest.password;

    UserSchema.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'This user does not exist' });
        }

        console.log(guest)
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };

                jwtToken.sign(
                    payload,
                    keys.secretKey,
                    // Tell the key to expire in one hour
                    { expiresIn: 86400 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    });
            } else {
                return res.status(400).json({ password: 'Incorrect password' });
            }
        });
    });

}
