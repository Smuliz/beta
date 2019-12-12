"use strict";
const express = require("express");
const cors = require('cors');
const passport = require("./utils/pass.js");
const fs = require('fs');
const https = require('https');


const app = express();
const port = 3000;
const httpsPort = 8000;

const userRoute = require("./routes/userRoute.js");
const authRoute = require("./routes/authRoute.js");
const alennusRoute = require("./routes/alennusRoute.js");
const tuoteRoute = require('./routes/tuoteRoute');
const kauppaRoute = require('./routes/kauppaRoute');
const listaRoute = require('./routes/listaRoute');

// const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
// const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
// const options = {
//     key: sslkey,
//     cert: sslcert,
// };

app.use(cors());
app.use("/thumbnails", express.static("thumbnails"));
app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/auth", authRoute);
app.use("/user", passport.authenticate('jwt', {session:false}), userRoute);  // <-- En oo varma tästä? userRoute pitää päivittää
app.use("/alennus", passport.authenticate('jwt', {session:false}), alennusRoute);
app.use('/tuote', passport.authenticate('jwt', {session:false}), tuoteRoute);
app.use('/kauppa', passport.authenticate('jwt', {session:false}), kauppaRoute);
app.use('/lista', passport.authenticate('jwt', {session:false}), listaRoute);

app.listen(port, () => console.log(`listening to port ${port}!`));
// https.createServer(options, app).listen(httpsPort);