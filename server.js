'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL)
client.connect();
client.on('error', err => console.error(err));


const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs')



// app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/books/:id', (req, res ) => {
  console.log('route is correct')

  let SQL = 'SELECT * FROM books WHERE id = $1;';
  let values = [req.params.id];
  return client.query(SQL, values)
    .then(data => {
      return res.render('pages/books/show.ejs' , {banana: data.rows})
    })
    .catch( err => console.error(err));

});

app.post('/searches', bookHandler)

function bookHandler(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;

  if (req.body.search[1] === 'Author') {
    url += `inauthor:${req.body.search[0]}`
  }
  if (req.body.search[1] === 'Title') {
    url +=`intitle:${req.body.search[0]}`
  }

  superagent.get(url)
    .then(data => {
      let array = [];
      data.body.items.map(book => array.push(new Book(book.volumeInfo))
      )
      res.render('pages/searches/show', {displayData: array} )
    })
    .catch(err => {
      res.render('pages/error');
    });
}


function Book(book) {
  this.thumbnail = book.imageLinks.smallThumbnail
  this.title = book.title;
  this.authors = book.authors;
  this.description = book.description;
}

app.listen(PORT, () => { console.log(`listening on port : ${PORT}`) });
