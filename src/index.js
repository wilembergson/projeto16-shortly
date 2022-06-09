import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/userRouter.js"
import urlsRouter from "./routes/urlsRouter.js"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

app.use(authRouter)
app.use(urlsRouter)

app.listen(process.env.PORT, ()=> console.log(`Running on port ${process.env.PORT}...`))