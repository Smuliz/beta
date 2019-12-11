"use strict";
const express = require("express");
const cors = require('cors');
const passport = require("./utils/pass.js");


const app = express();
const port = 3000;

const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");
const alennusRoute = require("./routes/alennusRoute.js");
const tuoteRoute = require('./routes/tuoteRoute');
const kauppaRoute = require('./routes/kauppaRoute');

app.use(cors());
app.use("/thumbnails", express.static("thumbnails"));
app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/auth", authRoute);
app.use("/user", passport.authenticate('jwt', {session:false}), userRoute);  // <-- En oo varma tästä? userRoute pitää päivittää
app.use("/alennus", passport.authenticate('jwt', {sessions:false}), alennusRoute);
app.use('/tuote',tuoteRoute);
app.use('/kauppa',kauppaRoute);

app.listen(port, () => console.log(`listening to port ${port}!`));