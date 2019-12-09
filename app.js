'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const tuoteRoute = require('./routes/tuoteRoute');
const kauppaRoute = require('./routes/kauppaRoute');

app.use(cors());

app.use(express.json());//for parsing applications/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static('uploads'));
app.use('/tuote',tuoteRoute);
app.use('/kauppa',kauppaRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

