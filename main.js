const express = require('express')
const app = express()
var ex1 = require('./Root/element.js');

const bodyParser =require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 
app.post('/register',ex1.register);

app.post('/login',ex1.login);

app.listen(3000) 