const express = require('express')
const router = express.Router()
const passport = require('passport')

const { addChat, getChats, editChat, deleteChat } = require('../controllers/chats')

router.post('/', passport.authenticate('jwt', { session: false }), addChat)
router.get('/', passport.authenticate('jwt', { session: false }), getChats)
router.put('/', passport.authenticate('jwt', { session: false }), editChat)
router.delete('/', passport.authenticate('jwt', { session: false }), deleteChat)


module.exports = router