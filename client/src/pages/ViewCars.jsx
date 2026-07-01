import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import CarPreview from '../components/CarPreview'
import { deleteCar, getAllCars } from '../services/CarsAPI'
import { formatCurrency, getOptionLabel } from '../utilities/carOptions'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadCars = async () => {
            try {
                const data = await getAllCars()
                setCars(data)
            }
            catch (error) {
                setError(error.message)
            }
            finally {
                setLoading(false)
            }
        }

        loadCars()
    }, [])

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Delete this custom car?')

        if (!shouldDelete) {
            return
        }

        try {
            await deleteCar(id)
            setCars(cars.filter((car) => car.id !== id))
        }
        catch (error) {
            setError(error.message)
        }
    }
    
    return (
        <section className="page-shell">
            <header className="page-heading">
                <p>Saved builds</p>
                <h2>Custom Cars</h2>
            </header>

            {loading && <p className="status-message">Loading cars...</p>}
            {error && <p className="form-error">{error}</p>}

            {!loading && cars.length === 0 && (
                <article className="empty-state">
                    <h3>No custom cars yet</h3>
                    <p>Start with a new build, then your saved cars will show up here.</p>
                    <Link to="/" role="button">Create a Car</Link>
                </article>
            )}

            <div className="cars-grid">
                {cars.map((car) => (
                    <article className="car-card" key={car.id}>
                        <CarPreview car={car} />
                        <header>
                            <h3>{car.name}</h3>
                            <p>{formatCurrency(car.totalPrice)}</p>
                        </header>
                        <p>
                            {getOptionLabel('bodyStyle', car.bodyStyle)} with{' '}
                            {getOptionLabel('paintColor', car.paintColor)} paint and{' '}
                            {getOptionLabel('wheelStyle', car.wheelStyle)} wheels.
                        </p>
                        <footer>
                            <Link to={`/customcars/${car.id}`} role="button">View</Link>
                            <Link to={`/edit/${car.id}`} role="button" className="secondary">Edit</Link>
                            <button className="outline" onClick={() => handleDelete(car.id)}>
                                Delete
                            </button>
                        </footer>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default ViewCars
