import React from 'react'
import CarPreview from './CarPreview'
import {
    carOptions,
    featureLabels,
    formatCurrency,
    getDisabledReason
} from '../utilities/carOptions'

const CarForm = ({ car, error, submitText, onChange, onSubmit }) => {
    const renderOptions = (feature) => {
        return carOptions[feature].map((option) => {
            const disabledReason = getDisabledReason(feature, option.value, car)

            return (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={Boolean(disabledReason)}
                >
                    {option.label} (+{formatCurrency(option.price)})
                    {disabledReason ? ` - ${disabledReason}` : ''}
                </option>
            )
        })
    }

    return (
        <main className="builder-layout">
            <form className="builder-form" onSubmit={onSubmit}>
                <label>
                    Build Name
                    <input
                        name="name"
                        value={car.name}
                        onChange={onChange}
                        placeholder="Example: Midnight Cruiser"
                    />
                </label>

                {Object.keys(carOptions).map((feature) => (
                    <label key={feature}>
                        {featureLabels[feature]}
                        <select
                            name={feature}
                            value={car[feature]}
                            onChange={onChange}
                        >
                            {renderOptions(feature)}
                        </select>
                    </label>
                ))}

                {error && <p className="form-error">{error}</p>}

                <button type="submit">{submitText}</button>
            </form>

            <CarPreview car={car} />
        </main>
    )
}

export default CarForm
