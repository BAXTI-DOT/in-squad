import { UserInputError } from "apollo-server"
import { byId, deleteUser, getUsers, newUser, newUserBook, updateUser } from "./model"
import User from '../../interfaces/user-interface'
import { userBooks } from "../books/model"

export default {
    Query: {
        users: async() => await getUsers(),
        user: async(_: never, { userId }) => await byId(userId)
    },
    Mutation: {
        createUser: async(_: never, { input: { firstName, lastName, age, isFree = true } }) => {
            try {
                if(!firstName || !lastName || !age) {
                    return new UserInputError("Provide valid credentials")
                }

                return await newUser(firstName, lastName, age, isFree)
            } catch(err) {
                throw new Error("Internal Server Error")
            }
        },
        updateUser: async(_: never, { input: { firstName, lastName, age, isFree, userId } }) => {
            try {
                return await updateUser(firstName, lastName, age, isFree, userId)
            } catch(err) {
                console.log(err)
                throw new Error("Internal Server Error")
            }
        },
        deleteUser: async(_: never, { userId }) => {
            try {
                if(!userId) {
                    return new UserInputError("Provide userId")
                }

                return await deleteUser(userId)
            } catch(err) {
                console.log(err)
                throw new Error("Internal Server Error")
            }
        },
        newUserBook: async(_: never, { userId, bookId }) => {
            try {
                if(!userId || !bookId) {
                    return new UserInputError("Provide valid credentials")
                }

                const newuserBook = await newUserBook(bookId, userId)

                if(newuserBook) {
                    return "New book has been read"
                }
            } catch(err) {
                console.log(err)
                throw new Error("Internal Server Error")
            }
        },
    },
    Users: {
        id: (g: User) => g.user_id,
        firstName: (g: User) => g.user_first_name,
        lastName: (g: User) => g.user_last_name,
        age: (g: User) => g.user_age,
        isFree: (g: User) => g.user_is_free,
        createdAt: (g: User) => new Date(g.user_created_at).toISOString().split('T')[0],
        updatedAt: (g: User) => new Date(g.user_updated_at).toISOString().split('T')[0],
        Books: async(g: User) => await userBooks(g.user_id)
    }
}