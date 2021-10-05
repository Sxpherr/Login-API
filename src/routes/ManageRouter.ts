import { Application, Router, Request, Response, NextFunction } from "express";
import { Connection } from "mysql";
import generateID from "../info/generateID";

export default class ManageRouter {
    protected app: Application;
    protected router: Router;
    protected db: Connection;

    public constructor(app: Application, db: Connection) {
        this.db = db;
        this.app = app;
        this.router = Router()

        this.app.use(this.router)

        this.router.post("/users/create", (req: Request, res: Response, next: NextFunction) => {
            const email = req.body.email
            const username = req.body.username
            const password = req.body.password

            if(!email) {
                res.status(500).send("Missing Parameters")
                return;
            } if(!username) {
                res.status(500).send("Missing Parameters")
                return
            } if(!password) {
                res.status(500).send("Missing Parameters")
                return
            }

            this.db.query(`INSERT INTO Users (email, username, password, id) VALUES ('${email}','${username}','${password}',${generateID()})`,
              function(err, data, fields) {
                if(err) {
                  res.status(500).send(err)
                  return
                }
            })

            this.db.query(`SELECT * FROM Users WHERE email = '${email}'`,
              function(err, data, fields) {
                  if(err) {                 
                      res.status(500).send(err)
                      return;
                  }
                res.status(200).send(`Created User With ID: ${data[0].id} (${data[0].username})`)
            })
        })
        this.router.delete("/users/delete/:id/:password", (req: Request, res: Response) => {
            const userID = req.params.id
            const password = req.params.password

            if(!userID) {
                res.status(500).send("Please Type an ID")
                return;
            }

            if(!password) {
                res.status(500).send("Please Write The Password")
                return
            }

            this.db.query(`SELECT * FROM Users WHERE id = ${userID}`,
            function(err, data, fields) {
                if(err) {
                    res.status(500).send(err)
                    return
                }
                if(password === data[0].password) {
                    db.query(`DELETE FROM Users WHERE id = ${userID}`,
                    function(err, data, fields) {
                        res.status(200).send("Deleted User")
                    })
                } else {
                    res.status(500).send("Invalid Password")
                    return
                }
            })
        })

        this.router.patch("/users/edit/:id", (req: Request, res: Response) => {
            const userID = req.params.id
            const type = req.body.type
            const newData = req.body.newdata
            const password = req.body.password

            if(!userID) {
                res.status(200).send("Please Add An ID")
                return;
            }

            if(!password) {
                res.status(500).send("Please Write The Password")
                return;
            }

            this.db.query(`SELECT * FROM Users WHERE id = ${userID}`,
            function(err, data) {
                if(password === data[0].password) {
                    db.query(`UPDATE Users SET ${type} = '${newData}' WHERE id = ${userID}`,
                    function(err, data) {
                        res.status(200).send("Updated User")
                    })
                } else {
                    res.status(500).send("Invalid Password")
                    return;
                }
            })
        })
    }
}