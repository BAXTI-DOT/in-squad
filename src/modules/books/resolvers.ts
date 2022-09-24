import { UserInputError } from "apollo-server"
import { deleteBook, getBooks, newBook, updateBook } from "./model"
import Book from "../../interfaces/book-interface"

export default {
    Query: {
        books: async() => await getBooks()
    },
    Mutation: {
        createBook: async(_: never, { title, author }) => {
            try {
                if(!title || !author) {
                    return new UserInputError("Provide valid credentials")
                }

                return await newBook(title, author)
            } catch(err) {
                throw new Error("Internal Server Error")
            }
        },
        updateBook: async(_: never, { title, author, bookId }) => {
            try {
                return await updateBook(title, author, bookId)
            } catch(err) {
                console.log(err)
                throw new Error("Internal Server Error")
            }
        },
        deleteBook: async(_: never, { bookId }) => {
            try {
                if(!bookId) {
                    return new UserInputError("Provide bookId")
                }

                return await deleteBook(bookId)
            } catch(err) {
                console.log(err)
                throw new Error("Internal Server Error")
            }
        },
    },
    Books: {
        id: (g: Book) => g.book_id,
        title: (g: Book) => g.book_title,
        author: (g: Book) => g.book_author,
        createdAt: (g: Book) => new Date(g.book_created_at).toISOString().split('T')[0]
    }
}