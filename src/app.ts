import express, { Application } from "express";
import MainRouter from "./routes/MainRouter";
import ManageRouter from "./routes/ManageRouter";
import UserRouter from "./routes/UserRouter";
import connection from "./database/connection";
import bodyParser from "body-parser"

const app: Application = express()

app.use(bodyParser.json())

connection.connect()

new MainRouter(app, connection)
new ManageRouter(app, connection)
new UserRouter(app, connection)

app.listen(5056, '0.0.0.0', () => {
    console.log("running hehe")
})