import db from "../database.js"

//OBTER USUARIO PELO ID
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
    }catch(erro){
        return res.status(500).send(erro)
    }
}

//RANKING POR SOMA DE VISITAS
export async function ranking(req, res){
    try{
        const userResult = await db.query(
            `SELECT users.id, users.name, COUNT(u.id) AS "linksCount", SUM(u.visitcount) AS "visitCount"
             FROM users
             JOIN urls u ON users.id = u.userid
             GROUP BY users.id
             ORDER BY "visitCount" DESC
             LIMIT 10;`)
        
        return res.status(200).send(userResult.rows)
    }catch(erro){
        return res.status(500).send(erro)
    }
}