const express = require('express')
const passport = require('passport')
 
const controller = require('../controllers/position')
 
const router = express.Router();
 
 
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
 
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
 
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
 
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)
 
module.exports = router

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VySWQiOiI2YWQ3OWNhOWZhMzFhZTRlOWZmOGJlZGEiLCJpYXQiOjE3OTI1MTUzMzgsImV4cCI6MTc5MjUxODkzOH0.GkNdlKo6lnbvzvcyyGAaPApcXEfwn_4WCkispZ_LKa8