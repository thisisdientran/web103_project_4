import React from 'react'
import {
    calculateTotalPrice,
    formatCurrency,
    getOption
} from '../utilities/carOptions'

const CarPreview = ({ car }) => {
    const paint = getOption('paintColor', car.paintColor)
    const body = getOption('bodyStyle', car.bodyStyle)
    const totalPrice = car.totalPrice || calculateTotalPrice(car)

    return (
        <section className="preview-panel">
            <div className="preview-stage">
                <div className={`car-preview ${body?.previewClass || ''}`}>
                    <div className="car-roof" style={{ backgroundColor: paint?.color }}></div>
                    <div className="car-body" style={{ backgroundColor: paint?.color }}>
                        <span className="headlight"></span>
                        <span className="taillight"></span>
                    </div>
                    <div className={`wheel wheel-left ${car.wheelStyle}`}></div>
                    <div className={`wheel wheel-right ${car.wheelStyle}`}></div>
                </div>
            </div>

            <div className="preview-price">
                <span>Total Price</span>
                <strong>{formatCurrency(totalPrice)}</strong>
            </div>
        </section>
    )
}

export default CarPreview
