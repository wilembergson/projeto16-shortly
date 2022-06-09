import Joi from 'joi'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

import db from '../../database.js'

export async function signUpValidation(req, res, next){
    const user = req.body
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(user.password).required()
    })
    const {error} = userSchema.validate(user)
    if(error) return res.status(422).json({message:'Complete o cadastro corretamente.'})

    const cryptPassword = bcrypt.hashSync(user.password, 10)
    res.locals.newUser = {
        name: user.name,
        email: user.email,
        password: cryptPassword
    }
    next()
}

export async function signInValidation(req, res, next){
    const login = req.body 
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const {error} = loginSchema.validate(login)
    if(error) return res.status(401).send('Preencha os campos corretamente.')
    try{
        const user = await db.query(`SELECT users.* FROM users WHERE users.email = $1;`, [login.email])
        const newUser = user.rows[0]
        if(newUser && bcrypt.compareSync(login.password, newUser.password)){
            const token = uuid()
            res.locals.loginData = {
                token: token,
                userId: newUser.id
            }
        }else{
            return res.status(401).send('Usuário ou senha incorretos!')
        }
    }catch(error){
        return res.status(500).send('Deu algo errado ao tentar fazer o login.')
    }
    next()
}