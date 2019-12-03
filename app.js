"use strict";
const express = require("express");
const passport = require("./utils/pass");
const cors = require('cors');


const app = express();
const port = 3000;
const authRoute = require("./routes/authRoute.js");

app.use(cors());

app.listen(port, () => console.log(`listening to port ${port}!`));