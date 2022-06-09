import { Router } from "express";
import { getUrlById, openUrl, shortenUrl } from "../controllers/urlsController.js";
import { openUrlValidation, urlValidation } from "../middlewares/urlsMiddleware.js";

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', urlValidation, shortenUrl)
urlsRouter.get('/urls/:id', getUrlById)
urlsRouter.get('/urls/open/:shortUrl', openUrlValidation, openUrl)

export default urlsRouter