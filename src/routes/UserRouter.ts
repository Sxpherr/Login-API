import { Application, Router, Request, Response } from "express";
import { Connection } from "mysql";

export default class UserRouter {
    protected app: Application;
    protected router: Router;
    protected db: Connection;

    public constructor(app: Application, db: Connection) {
        this.app = app;
        this.router = Router()
        this.db = db;

        this.app.use(this.router)

        this.router.get("/users/:id", (req: Request, res: Response) => {
            
        })
    }
}