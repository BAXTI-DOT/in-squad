import { fetchOne, fetchMany } from "../../utils/postgres";

const ALL_USERS = `
    SELECT * FROM users
`

const NEW_USER = `
    INSERT INTO users(
        user_first_name,
        user_last_name,
        user_age,
        user_is_free
    ) 
    VALUES($1, $2, $3, $4)
    RETURNING
        *
`

const UPDATE_USER = `
    UPDATE
        users
    SET 
        user_first_name = (CASE WHEN LENGTH($1) > 1 THEN $1 ELSE users.user_first_name END),
        user_last_name = (CASE WHEN LENGTH($2) > 1 THEN $2 ELSE users.user_last_name END),
        user_age = (CASE WHEN $3 > 0 THEN $3 ELSE users.user_age END),
        user_is_free = (CASE WHEN $4 THEN TRUE ELSE FALSE END),
        user_updated_at = CURRENT_DATE
    WHERE
        user_id = $5
    RETURNING 
        *
`

const DELETE_USER = `
    DELETE FROM users WHERE user_id = $1 RETURNING *
`

const BY_ID = `
    SELECT * FROM users WHERE user_id = $1
`

const NEW_USER_BOOK = `
    INSERT INTO user_books(book_id, user_id) VALUES($1, $2) RETURNING *
`

export const getUsers = () => fetchMany(ALL_USERS)
export const newUser = (name: string, lastname: string, age: number, isFree: boolean) => fetchOne(NEW_USER, name, lastname, age, isFree)
export const byId = (id: string) => fetchOne(BY_ID, id)
export const updateUser = (name: string, lastname: string, age: number, isFree: boolean, userId: string) => fetchOne(UPDATE_USER, name, lastname, age, isFree, userId)
export const deleteUser = (id: number) => fetchOne(DELETE_USER, id)
export const newUserBook = (bookId: number, userId: number) => fetchOne(NEW_USER_BOOK, bookId, userId)