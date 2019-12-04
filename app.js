"use strict";
const express = require("express");
const passport = require("./utils/pass");
const cors = require('cors');


const app = express();
const port = 3000;
const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/auth", authRoute);
//app.use("/user", passport.authenticate('jwt', {session:false}), userRoute);  // <-- En oo varma tästä? userRoute pitää päivittää

app.listen(port, () => console.log(`listening to port ${port}!`));