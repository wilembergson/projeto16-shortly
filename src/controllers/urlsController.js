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

export async function getUrlById(req, res){
    const { id } = req.params
    try{
        const urlData = await db.query(
            `SELECT urls.id, urls.shortUrl, urls.url
            FROM urls
            WHERE urls.id = $1;`, [id])
        if(urlData.rows.length === 0 || id===''){
            return res.status(404).send(`ID não encontrado. Tente um ID valido.`)
        }
        res.status(200).send(urlData.rows[0])  
    }catch(error){
        return res.status(500).send(error)
    }
}