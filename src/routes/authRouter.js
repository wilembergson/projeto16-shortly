import { Router } from "express"
import { signin, signup } from "../controllers/authController.js"
import { signInValidation, signUpValidation } from "../middlewares/authMiddleware.js"

const authRouter = Router()

authRouter.post('/signup', signUpValidation, signup)
authRouter.post('/signin', signInValidation, signin)

export default authRouter