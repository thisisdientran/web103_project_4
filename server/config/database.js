import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const isLocalDatabase = !process.env.PGHOST || ['localhost', '127.0.0.1'].includes(process.env.PGHOST)

const config = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    : {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        ssl: isLocalDatabase ? false : {
            rejectUnauthorized: false
        }
    }

export const pool = new pg.Pool(config)
