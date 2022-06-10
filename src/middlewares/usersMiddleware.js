import Joi from "joi"
import db from "../database.js"

export async function getUserByIdValidation(req, res, next){
    const {id} = req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer", "").trim()
    const tokenSchema = Joi.object({
        token: Joi.string().required(),
    })
    const {error} = tokenSchema.validate({token})
    if(error) return res.status(401).json({message:'Insira um token válido.'})
    
    try{
        const tokenResult = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        if(tokenResult.rows.length === 0){
            return res.status(401).send('Header invalido.')
        }
        const sessionResult = await db.query(`SELECT * FROM users WHERE id = $1;`, [id])
        if(sessionResult.rows.length === 0){
            return res.status(404).send('Usuario não encontrado.')
        }
        const userId = sessionResult.rows[0].id
        res.locals = {userId}
    }catch(error){
        return res.status(404).send(error)
    }
    next()
}