import db from "../database.js"

export async function getUserById(req, res){
    const {userId} = res.locals
    try{
        const userResult = await db.query(
            `SELECT id, name
             FROM users
             WHERE id = $1;`, [userId])
        const user = userResult.rows[0]
        
        const urlsResult = await db.query(
            `SELECT id, shorturl, url, visitcount
             FROM urls
             WHERE userid = $1
             ORDER BY id;`, [user.id])
        const urls = urlsResult.rows

        let visitCount = 0
        urls.forEach(url => visitCount += url.visitcount)
        
        const result = {
            id: user.id,
            name: user.name,
            visitCount,
            shortenedUrls: urls

        }
        return res.status(200).send(result)
    }catch(e){
        console.log(e)
        return res.status(500).send("Ocorreu algum erro ao cadastrar um novo game.")
    }
}