import { createConnection, Connection } from "mysql";
import { config } from "dotenv"
config()

let connection: Connection = createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

export default connection;