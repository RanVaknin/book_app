DROP TABLE IF EXISTS books ;

CREATE TABLE books (
    id serial PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn BIGINT,
    image_url VARCHAR(255),
    descript TEXT,
    bookshelf VARCHAR
);


INSERT INTO books (id, author, title, isbn, image_url, descript, bookshelf)
VALUES (1, 'J. D. Salinger', 'The Catcher in the Rye',1603891641, 'http://books.google.com/books/content?id=E73DixZo-AAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api','An overview of the work features a biographical sketch of the author, a list of characters, a summary of the plot, and critical and analytical views of the work.', 'Ran bookshelf' );

INSERT INTO books (id, author, title, isbn, image_url, descript, bookshelf)
VALUES (2, 'J.R.R. Tolkien', 'The Hobbit',9780544115552, 'http://books.google.com/books/content?id=OlCHcjX0RT4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api','This lavish gift edition of J.R.R. Tolkiens classic features cover art, illustrations, and watercolor paintings by the artist Alan Lee. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum. Written for J.R.R. Tolkiens own children, The Hobbit has sold many millions of copies worldwide and established itself as a modern classic.', 'Ran bookshelf' );

