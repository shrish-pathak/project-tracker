const express = require('express')
const router = express.Router()
const passport = require('passport')

const {addProject,getProjects,updateProject,deleteProject} = require('../controllers/projects')

router.post('/',passport.authenticate('jwt',{session:false}),addProject)
router.get('/',passport.authenticate('jwt',{session:false}),getProjects)
router.put('/',passport.authenticate('jwt',{session:false}),updateProject)
router.delete('/',passport.authenticate('jwt',{session:false}),deleteProject)


module.exports = router