const express = require('express');
const routes = express.Router();
const authControllers = require('../controllers/auth/authController');
const Joi = require('joi');
const validetor = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');

const registerSchema = Joi.object({
    username:Joi.string().min(3).max(12).required(),
    password:Joi.string().min(3).max(12).required(),
    mail:Joi.string().email().required(),
})

const loginSchema = Joi.object({
    password:Joi.string().min(3).max(12).required(),
    mail:Joi.string().email().required(),
})

routes.post('/register',validetor.body(registerSchema),authControllers.controllers.postRegister)

routes.post('/login',validetor.body(loginSchema),authControllers.controllers.postLogin);

//test route

routes.get('/test',auth,(req,res)=>{
    res.send("send reponse to test");
})


module.exports = routes;