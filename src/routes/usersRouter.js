import { Router } from "express";
import { getUserById, ranking } from "../controllers/usersController.js";
import { getUserByIdValidation } from "../middlewares/usersMiddleware.js";

const usersRouter = Router()

usersRouter.get('/users/:id', getUserByIdValidation, getUserById)
usersRouter.get('/ranking', ranking)

export default usersRouter