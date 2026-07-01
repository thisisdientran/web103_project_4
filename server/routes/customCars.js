import express from 'express'
import {
    createCustomCar,
    deleteCustomCar,
    getCustomCar,
    getCustomCars,
    updateCustomCar
} from '../controllers/customCars.js'

const router = express.Router()

router.get('/', getCustomCars)
router.get('/:id', getCustomCar)
router.post('/', createCustomCar)
router.put('/:id', updateCustomCar)
router.delete('/:id', deleteCustomCar)

export default router
