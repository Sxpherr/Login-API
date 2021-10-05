import { Application, Router, Request, Response, application } from "express"
import { Connection } from "mysql"

export default class MainRouter {
    protected app: Application;
    protected router: Router;
    protected db: Connection;

    public constructor(app: Application, db: Connection) {
        this.app = app;
        this.router = Router()
        this.db = db;

        this.app.use(this.router)

        this.router.get("/", (req: Request, res: Response) => {
            res.send("Hello")
        })
    }
}