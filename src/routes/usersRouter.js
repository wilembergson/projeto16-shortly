import { Router } from "express";
import { getUserById } from "../controllers/usersController.js";
import { getUserByIdValidation } from "../middlewares/usersMiddleware.js";

const usersRouter = Router()

usersRouter.get('/users/:id', getUserByIdValidation, getUserById)

export default usersRouter