import { fetchOne, fetchMany } from "../../utils/postgres";

const ALL_BOOKS = `
    SELECT * FROM books
`

const NEW_BOOK = `
    INSERT INTO books(book_title, book_author) VALUES($1, $2) RETURNING *
`

const UPDATE_BOOK = `
    UPDATE
        books
    SET 
        book_title = (CASE WHEN LENGTH($1) > 0 THEN $1 ELSE books.book_title END),
        book_author = (CASE WHEN LENGTH($2) > 0 THEN $2 ELSE books.book_author END)
    WHERE
        book_id = $3
    RETURNING 
        *
`

const DELETE_BOOK = `
    DELETE FROM books WHERE book_id = $1 RETURNING *
`

const USER_BOOKS = `
    SELECT 
        *
    FROM
        books
    INNER JOIN
        user_books 
    ON
        books.book_id = user_books.book_id
    WHERE
        user_books.user_id = $1
`

export const getBooks = () => fetchMany(ALL_BOOKS)
export const newBook = (title: string, author: string) => fetchOne(NEW_BOOK, title, author)
export const updateBook = (title: string, author: string, bookId: string) => fetchOne(UPDATE_BOOK, title, author, bookId)
export const deleteBook = (id: number) => fetchOne(DELETE_BOOK, id)
export const userBooks = (id: number) => fetchMany(USER_BOOKS, id)