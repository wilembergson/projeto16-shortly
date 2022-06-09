import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import { urlValidation } from "../middlewares/urlsMiddleware.js";

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', urlValidation, shortenUrl)

export default urlsRouter