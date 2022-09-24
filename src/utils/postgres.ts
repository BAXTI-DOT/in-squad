import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const fetchOne = async(SQL: string, ...params: any[]): Promise<any> => {
    const client = await pool.connect()
    try {
        const { rows: [ row ] } = await client.query(SQL, params.length ? params : null)
        return row
    } finally {
        client.release()
    }
}       

export const fetchMany = async(SQL: string, ...params: any[]): Promise<any> => {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(SQL, params.length ? params : null)
        return rows
    } finally {
        client.release()
    }
}       