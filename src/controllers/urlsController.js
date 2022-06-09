import db from "../database.js"

export async function shortenUrl(req, res){
    const { shortUrl, url, userId } = res.locals.urlData
    try{
        await db.query(
            `INSERT INTO urls (shortUrl, url, userId)
             VALUES ($1, $2, $3);`, [shortUrl, url, userId])
        res.status(201).send({shortUrl})  
    }catch(error){
        return res.status(500).send(error)
    }
}