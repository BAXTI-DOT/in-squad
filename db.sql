DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id serial not null,
    user_first_name varchar(64) not null,
    user_last_name varchar(64) not null,
    user_age int not null,
    user_is_free boolean DEFAULT true,
    user_created_at DATE DEFAULT CURRENT_DATE,
    user_updated_at DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY(user_id)
);

DROP TABLE IF EXISTS books;
CREATE TABLE books(
    book_id serial not null,
    book_title varchar(256) not null,
    book_author varchar(128) not null,
    book_created_at DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY(book_id)
);

DROP TABLE IF EXISTS user_books;
CREATE TABLE user_books(
    user_book_id serial not null,
    book_id int,
    user_id int,
        FOREIGN KEY (book_id)
        REFERENCES books(book_id)
        ON DELETE SET NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);