import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {routes} from './routes';
const port =  process.env.PORT || 3007;
import * as bcrypt from 'bcrypt';
import {userModel, test1 }from './model';
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, email, authtoken, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
// "start": "npm run build && nodemon ./build/src/main.js"

 app.post('/signup',  async (req, res) => {
   let { password, username } = req.body;
   console.log(req.body);
   await bcrypt.hash(password, saltRounds, async(err,   hash)=> {
  let user = await new userModel(req.body);
  await user.save();
  let token = jwt.sign({username: username},'config',{ expiresIn: '24h'});
  res.send({success: true, message: 'Authentication successful!',token: token});
  });
});

   app.post('/login', async (req, res, next) => {
   try {
     let user = await userModel.findOne({email: req.headers.email}).sort({createdAt: 1});
     if (!user)
       return next("user with email doesn't exist");

     if (!(user.password === req.headers.password))
       return next("Authentication failed")

     res.send({success: true, user: user.toJson()});
   }
   catch(err) {
     next(err);
   }
 });

routes(app);
app.listen(80, ()=>{console.log(`Server Running on Port:${80}.`); });
require('mongoose').connect("mongodb://test:test12@ds345587.mlab.com:45587/proj-mng")
  .then(() => { console.log("Connection Succesfull"); });
