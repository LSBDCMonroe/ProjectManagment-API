"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = process.env.PORT || 3007;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    console.log(req);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, email, authtoken, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
let { userModel, test1 } = require('./model');
app.get('/', (req, res) => {
    console.log(req);
    res.send({ active: true, updatedOn: new Date() });
});
app.get('/test', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    console.log(req);
    res.send({ a: "data" });
}));
app.post('/signup', function (req, res) {
    bcrypt.hash(req.body.passwordsignup, saltRounds, function (err, hash) {
    });
});
app.listen(port, () => { console.log(`Server Running on Port:${port}.`); });
require('mongoose').connect("mongodb://test1:test123@ds345587.mlab.com:45587/proj-mng")
    .then(() => { console.log("connection succesfull"); });
//# sourceMappingURL=main.js.map