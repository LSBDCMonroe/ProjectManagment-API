import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
// const utils = require('./utils/utils');
// const urlencodedParser = bodyParser.urlencoded({extended: false});
const port =  process.env.PORT || 3007;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, email, authtoken, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

 let { userModel } = require('./model');
app.get('/', (req, res) => {
    console.log(req);
    res.send({active: true, updatedOn: new Date()});
});

app.get('/data', async (req, res) => {
    console.log(req);
   let data = await userModel.find({});
    res.send({a: data});
});

app.listen(port, ()=>{console.log(`Server Running on Port:${port}.`); });
require('mongoose').connect("mongodb://test12:test12@ds233167.mlab.com:33167/test1", { useNewUrlParser: true })
   .then(() => { console.log("connection succesfull"); })
   .catch(()=>{console.log("cannot connect")});
