import db from "../database.js"

//ADICIONAR NOVO USUARIO
export async function signup(req, res){
    const {newUser} = res.locals
    try{
        const result = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3);`, [newUser.name, newUser.email, newUser.password])
        return res.status(201).send("Novo usuario cadastrado com sucesso.")
    }catch(e){
        console.log(e)
        return res.status(500).send("Ocorreu algum erro ao cadastrar um novo usuario.")
    }
}

//LOGIN
export async function signin(req, res){
    const { token, userId } = res.locals.loginData
    try{
        await db.query(
            `INSERT INTO sessions (token, userId)
             VALUES ($1, $2);`, [token, userId])
        res.status(200).send({token})  
    }catch(error){
        return res.status(500).send("Erro ao tentar fazer login.")
    }
}