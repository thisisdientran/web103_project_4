import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import CarPreview from '../components/CarPreview'
import { deleteCar, getCar } from '../services/CarsAPI'
import {
    featureLabels,
    formatCurrency,
    getOptionLabel
} from '../utilities/carOptions'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
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

    const handleDelete = async () => {
        const shouldDelete = window.confirm('Delete this custom car?')

        if (!shouldDelete) {
            return
        }

        try {
            await deleteCar(id)
            navigate('/customcars')
        }
        catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="page-shell">
            {loading && <p className="status-message">Loading car...</p>}
            {error && <p className="form-error">{error}</p>}

            {car && (
                <>
                    <header className="page-heading">
                        <p>Build details</p>
                        <h2>{car.name}</h2>
                    </header>

                    <main className="details-layout">
                        <CarPreview car={car} />

                        <article className="details-panel">
                            <h3>{formatCurrency(car.totalPrice)}</h3>
                            <ul>
                                {Object.keys(featureLabels).map((feature) => (
                                    <li key={feature}>
                                        <strong>{featureLabels[feature]}:</strong>{' '}
                                        {getOptionLabel(feature, car[feature])}
                                    </li>
                                ))}
                            </ul>
                            <footer>
                                <Link to={`/edit/${car.id}`} role="button">Edit Car</Link>
                                <button className="outline" onClick={handleDelete}>Delete</button>
                                <Link to="/customcars" role="button" className="secondary">Back</Link>
                            </footer>
                        </article>
                    </main>
                </>
            )}
        </section>
    )
}

export default CarDetails
