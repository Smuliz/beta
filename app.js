"use strict";
const express = require("express");
const passport = require("./utils/pass");

const app = express();
const port = 3000;
const authRoute = require("./routes/authRoute.js");

app.listen(port, () => console.log(`listening to port ${port}!`));