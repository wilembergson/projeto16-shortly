import Joi from "joi"
import { nanoid } from "nanoid"
import db from "../database.js"

export async function urlValidation(req, res, next){
    const {authorization} = req.headers
    const urlBody = req.body
    const token = authorization?.replace("Bearer", "").trim()
    
    const urlSchema = Joi.object({
        url: Joi.string().uri().required(),
    })
    const {error} = urlSchema.validate(urlBody)
    if(error) return res.status(422).json({message:'Insira uma URL válida.'})
    
    const session = await db.query(`
        SELECT sessions.* FROM sessions
        WHERE sessions.token = $1;`, [token])
    if(session.rows.length === 0){
        return res.status(401).send('Token inválido.')
    }
    const {userid} = session.rows[0]
    res.locals.urlData = {
        shortUrl: nanoid(8),
        url: urlBody.url,
        userId: userid
    }
    next()
}