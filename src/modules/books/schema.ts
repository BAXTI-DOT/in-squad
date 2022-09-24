import { gql } from 'apollo-server'

export default gql`
    type Books {
        id: ID!
        title: String!
        author: String!
        createdAt: Date!
    }

    extend type Query {
        books: [ Books ]!
    }

    extend type Mutation {
        createBook(title: String! author: String!): Books
        updateBook(title: String author: String bookId: ID!): Books
        deleteBook(bookId: ID!): Books
    }
`