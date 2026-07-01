import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'
import { buildPayload, defaultCar, validateCar } from '../utilities/carOptions'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(defaultCar)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCar = async () => {
            try {
                const data = await getCar(id)
                setCar(data)
            }
            catch (error) {
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

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
            const savedCar = await updateCar(id, buildPayload(car))
            navigate(`/customcars/${savedCar.id}`)
        }
        catch (error) {
            setError(error.message)
        }
    }
    
    return (
        <section className="page-shell">
            <header className="page-heading">
                <p>Update a saved build</p>
                <h2>Edit Custom Car</h2>
            </header>

            {loading && <p className="status-message">Loading car...</p>}
            {!loading && (
                <CarForm
                    car={car}
                    error={error}
                    submitText="Update Car"
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            )}
        </section>
    )
}

export default EditCar
