import * as express from "express";
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

const routes = (app)=>{
                    app.get('/', (req, res) => {
                        res.send({active: true, updatedOn: new Date()});
                    });

                    app.get('/test', async (req, res) => {
                    res.send({a: "data"});
                    });


                      app.post('/login', function (req, res) {
                        let {password} = req.headers;
                        // let user = await new userModel(req.body);
                        // await user.save();
                        let dbPassword = "$2b$10$7YYFfCWkJm.Mvoymb.4Wi.2LwLy2Ex0dlkidoVGw1rofRbZUrYEL.";
                        bcrypt.compare(password, dbPassword, function (err, result) {
                          result == true? res.send({match: true}): res.send({match: false, password: password});
                        });
                          });

                }

export {routes};
