import * as express from "express";
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import { userModel } from '../model';

const saltRounds = 10;

const signup =  async (req, res, next) => {
  let { password, username, email, lastName, firstName } = req.body;
  let user = await userModel.findOne({email: req.headers.email});

  if (user)
    res.send({success: false, message: 'User Not Created!'});

  await bcrypt.hash(password, saltRounds, async(err,   hash)=> {
     let user = await new userModel({ password: hash,
                                      username: username,
                                      email: email,
                                      lastName: lastName,
                                      firstName: firstName });
     await user.save();
     let token = jwt.sign({username: username}, 'config', { expiresIn: '204h'});
     res.send({success: true, message: 'User Created!',token: token});
 });
};

const login = async (req, res, next) => {
  try {
    let user = await userModel.findOne({email: req.headers.email}).sort({createdAt: 1});
    if (!user)
        res.send({success: false, message: 'user with email doesnt exist'});

    if (!(user.password === req.headers.password))
      return next("Authentication failed")
    res.send({success: true, user: user.toJson()});
  }
  catch(err) {
    next(err);}
}

const auth = async (req, res, next) => {

    if (req.headers.token) {
    jwt.verify(req.headers.token, 'config', (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        res.send({
          success: true,
          message: decoded
        });

      }
    });
  } else {
    return res.send({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

};

const routes = (app) => {
   app.get('/', (req, res) => {
    res.send({ active: true, updatedOn: new Date()});
  });
  app.post('/auth', auth);
  app.post('/signup', signup);
  app.post('/login', login);

}

export { routes };
