const express = require('express')
const router = express.Router()
const passport = require('passport')
const {loginHandler,registerHandler,getUsers} = require('../controllers/users')

router.get('/',passport.authenticate('jwt',{session:false}),getUsers)
router.post('/login',loginHandler)
router.post('/register',registerHandler)
module.exports = router