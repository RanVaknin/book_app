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

app.get('/search', (req, res) => {
  res.render('pages/searches/new')
})
app.post('/searches', bookHandler)
app.get('/', getBook);
app.get('/add' ,showBook)
app.post('/add' ,addbook)

function showBook(req,res){
  res.render('pages/add')
}

function addbook(req,res){
  let {title, authors, isbn, description,image_url,bookshelf} = req.body;
  let SQL = 'INSERT into books(title, author, isbn, descript,image_url,bookshelf) VALUES ($1, $2, $3, $4, $5, $6);';
  let values = [title, authors, isbn, description,image_url,bookshelf];
  return client.query(SQL, values)
    .then(res.redirect('/'))
    .catch(err => console.error(err))
}

function getBook(req, res) {
  let SQL = 'SELECT * FROM books;';
  client.query(SQL)
    .then(data => res.render('pages/index', { potato: data.rows }))
}

app.get('/books/:id', (req, res) => {
  let SQL = 'SELECT * FROM books WHERE id = $1;';
  let values = [req.params.id];
  client.query(SQL, values)
    .then(data => {
      return res.render('pages/books/show.ejs', { data: data.rows })
    })
    .catch(err => console.error(err));
});


function bookHandler(req, res) {
  let url = `https://www.googleapis.com/books/v1/volumes?q=`;

  if (req.body.search[1] === 'Author') {
    url += `inauthor:${req.body.search[0]}`
  }
  if (req.body.search[1] === 'Title') {
    url += `intitle:${req.body.search[0]}`
  }

  superagent.get(url)
    .then(data => {
      let array = data.body.items.map(book => {
        return new Book(book.volumeInfo)
      })
      res.render('pages/searches/show', { displayData: array })
    })
    .catch(err => {
      res.render('pages/error');
    });
}


function Book(book) {
  this.thumbnail = book.imageLinks.smallThumbnail
  this.title = book.title;
  this.authors = book.authors[0];
  this.description = book.description;
  this.isbn = book.industryIdentifiers[0].identifier;
}

app.listen(PORT, () => { console.log(`listening on port : ${PORT}`) });
