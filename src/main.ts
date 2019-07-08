import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {routes} from './routes';
const port =  process.env.PORT || 3007;
import * as bcrypt from 'bcrypt';
import {userModel, test1 }from './model';
const saltRounds = 10;

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
// app.route(/signup)
// .post()

 app.post('/signup',  async (req, res) => {
   let {password} = req.headers;
   console.log(req.headers);
   await bcrypt.hash(password, saltRounds, async(err,   hash)=> {
     let user = await new userModel(req.headers);
     await user.save();
     res.send({a:hash, b: password });
   })});

routes(app);

app.listen(81, ()=>{console.log(`Server Running on Port:${81}.`); });

require('mongoose').connect("mongodb://test:test12@ds345587.mlab.com:45587/proj-mng")
  .then(() => { console.log("Connection Succesfull"); });
