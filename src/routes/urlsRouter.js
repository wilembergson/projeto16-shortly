import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortenUrl } from "../controllers/urlsController.js";
import { deleteUrlValidation, openUrlValidation, urlValidation } from "../middlewares/urlsMiddleware.js";

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', urlValidation, shortenUrl)
urlsRouter.get('/urls/:id', getUrlById)
urlsRouter.get('/urls/open/:shortUrl', openUrlValidation, openUrl)
urlsRouter.delete('/urls/:id', deleteUrlValidation, deleteUrl)

export default urlsRouter