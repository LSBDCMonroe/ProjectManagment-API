import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {routes} from './routes';
const port =  process.env.PORT || 3007;
import * as bcrypt from 'bcrypt';
import * as swaggerUi from "swagger-ui-express";
import {swaggerDocument} from './docs';

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);
app.listen(80, ()=>{console.log(`Server Running on Port:${80}.`); });
require('mongoose').connect("mongodb://test:test12@ds345587.mlab.com:45587/proj-mng")
  .then(() => { console.log("Connection Succesfull"); });
