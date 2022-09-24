import { gql } from 'apollo-server'

export default gql`
    type Users {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int!
        isFree: Boolean!
        createdAt: Date!
        updatedAt: Date!
        Books: [ Books ]!
    }

    extend type Query {
        users: [ Users ]!
        user(userId: ID!): Users!
    }

    input User {
        firstName: String!
        lastName: String!
        age: Int!
        isFree: Boolean
    }

    input UpdateUser {
        firstName: String
        lastName: String
        age: Int
        isFree: Boolean
        userId: ID!
    }

    extend type Mutation {
        createUser(input: User!): Users!
        updateUser(input: UpdateUser!): Users!
        deleteUser(userId: ID!): Users
        newUserBook(userId: ID! bookId: ID!): String!
    }
`