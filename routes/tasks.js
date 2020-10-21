const express = require('express')
const router = express.Router()
const passport = require('passport')

const {addTask,getTasks,updateTask,deleteTask} = require('../controllers/tasks')

router.post('/',passport.authenticate('jwt',{session:false}),addTask)
router.get('/',passport.authenticate('jwt',{session:false}),getTasks)
router.put('/',passport.authenticate('jwt',{session:false}),updateTask)
router.delete('/',passport.authenticate('jwt',{session:false}),deleteTask)


module.exports = router