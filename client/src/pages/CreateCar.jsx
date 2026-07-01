import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import { buildPayload, defaultCar, validateCar } from '../utilities/carOptions'

const CreateCar = () => {
    const navigate = useNavigate()
    const [car, setCar] = useState(defaultCar)
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value
        })
        setError('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const errorMessage = validateCar(car)

        if (errorMessage) {
            setError(errorMessage)
            return
        }

        try {
            const savedCar = await createCar(buildPayload(car))
            navigate(`/customcars/${savedCar.id}`)
        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="page-shell">
            <header className="page-heading">
                <p>Design a custom ride</p>
                <h2>Build Your Bolt Bucket</h2>
            </header>

            <CarForm
                car={car}
                error={error}
                submitText="Save Car"
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </section>
    )
}

export default CreateCar
