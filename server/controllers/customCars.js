import { pool } from '../config/database.js'

const mapCar = (row) => ({
    id: row.id,
    name: row.name,
    bodyStyle: row.body_style,
    paintColor: row.paint_color,
    wheelStyle: row.wheel_style,
    interior: row.interior,
    upgradePackage: row.upgrade_package,
    totalPrice: row.total_price,
    createdAt: row.created_at
})

const getCarFromBody = (body) => ({
    name: body.name?.trim(),
    bodyStyle: body.bodyStyle || body.body_style,
    paintColor: body.paintColor || body.paint_color,
    wheelStyle: body.wheelStyle || body.wheel_style,
    interior: body.interior,
    upgradePackage: body.upgradePackage || body.upgrade_package,
    totalPrice: Number(body.totalPrice ?? body.total_price)
})

const checkCar = (car) => {
    if (!car.name || !car.bodyStyle || !car.paintColor || !car.wheelStyle || !car.interior || !car.upgradePackage) {
        return 'Please fill out every car option before saving.'
    }

    if (!Number.isFinite(car.totalPrice) || car.totalPrice <= 0) {
        return 'The car needs a valid total price.'
    }

    if (car.bodyStyle === 'compact' && car.upgradePackage === 'performance') {
        return 'The performance package does not fit the compact body style.'
    }

    if (car.bodyStyle === 'track' && car.interior === 'comfort') {
        return 'The comfort interior is too heavy for the track body style.'
    }

    return ''
}

export const getCustomCars = async (_, response) => {
    try {
        const results = await pool.query(
            'SELECT * FROM custom_cars ORDER BY created_at DESC, id DESC'
        )
        response.status(200).json(results.rows.map(mapCar))
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}

export const getCustomCar = async (request, response) => {
    try {
        const results = await pool.query(
            'SELECT * FROM custom_cars WHERE id = $1',
            [request.params.id]
        )

        if (results.rows.length === 0) {
            return response.status(404).json({ error: 'Custom car not found.' })
        }

        response.status(200).json(mapCar(results.rows[0]))
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}

export const createCustomCar = async (request, response) => {
    const car = getCarFromBody(request.body)
    const errorMessage = checkCar(car)

    if (errorMessage) {
        return response.status(400).json({ error: errorMessage })
    }

    try {
        const results = await pool.query(
            `INSERT INTO custom_cars
                (name, body_style, paint_color, wheel_style, interior, upgrade_package, total_price)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [
                car.name,
                car.bodyStyle,
                car.paintColor,
                car.wheelStyle,
                car.interior,
                car.upgradePackage,
                car.totalPrice
            ]
        )

        response.status(201).json(mapCar(results.rows[0]))
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}

export const updateCustomCar = async (request, response) => {
    const car = getCarFromBody(request.body)
    const errorMessage = checkCar(car)

    if (errorMessage) {
        return response.status(400).json({ error: errorMessage })
    }

    try {
        const results = await pool.query(
            `UPDATE custom_cars
             SET name = $1,
                 body_style = $2,
                 paint_color = $3,
                 wheel_style = $4,
                 interior = $5,
                 upgrade_package = $6,
                 total_price = $7
             WHERE id = $8
             RETURNING *`,
            [
                car.name,
                car.bodyStyle,
                car.paintColor,
                car.wheelStyle,
                car.interior,
                car.upgradePackage,
                car.totalPrice,
                request.params.id
            ]
        )

        if (results.rows.length === 0) {
            return response.status(404).json({ error: 'Custom car not found.' })
        }

        response.status(200).json(mapCar(results.rows[0]))
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}

export const deleteCustomCar = async (request, response) => {
    try {
        const results = await pool.query(
            'DELETE FROM custom_cars WHERE id = $1 RETURNING *',
            [request.params.id]
        )

        if (results.rows.length === 0) {
            return response.status(404).json({ error: 'Custom car not found.' })
        }

        response.status(200).json(mapCar(results.rows[0]))
    }
    catch (error) {
        response.status(500).json({ error: error.message })
    }
}
