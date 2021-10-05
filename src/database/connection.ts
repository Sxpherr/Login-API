import { createConnection, Connection } from "mysql";

let connection: Connection = createConnection({
    host: "localhost",
    user: "Sxpherr",
    password: "123godgg",
    database: "apidb"
})

export default connection;