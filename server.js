'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const ejs = require('ejs');
const superagent = require('superagent');



const PORT = process.env.PORT || 3000;
app.set(express.urlencoded({extended : true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs')



app.get('/', (req,res) => {   
  res.render('pages/index')
})

// app.get('/books', (req,res) => {

// })



app.listen(PORT , () =>{ console.log(`listening on port : ${PORT}`)});
