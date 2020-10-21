const express = require('express')
const router = express.Router()
const passport = require('passport')

const { getMessages, addMessage } = require('../controllers/messages')

router.get('/', passport.authenticate('jwt', { session: false }), getMessages)
router.post('/', passport.authenticate('jwt', { session: false }), addMessage)


module.exports = router