import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import router from "./router";

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/', router);

export default app;