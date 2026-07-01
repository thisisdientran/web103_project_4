import { pool } from './database.js'

const createTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS custom_cars;

        CREATE TABLE custom_cars (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            body_style TEXT NOT NULL,
            paint_color TEXT NOT NULL,
            wheel_style TEXT NOT NULL,
            interior TEXT NOT NULL,
            upgrade_package TEXT NOT NULL,
            total_price INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO custom_cars
            (name, body_style, paint_color, wheel_style, interior, upgrade_package, total_price)
        VALUES
            ('Ruby Comet', 'roadster', 'crimson', 'black', 'sport', 'performance', 39600),
            ('Campus Cruiser', 'compact', 'arctic', 'silver', 'cloth', 'tech', 25050);
    `

    try {
        await pool.query(createTableQuery)
        console.log('Custom cars table has been reset.')
    }
    catch (error) {
        console.error('Error resetting custom cars table:', error)
    }
    finally {
        await pool.end()
    }
}

createTable()
