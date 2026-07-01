export const defaultCar = {
    name: '',
    bodyStyle: 'compact',
    paintColor: 'crimson',
    wheelStyle: 'silver',
    interior: 'cloth',
    upgradePackage: 'none'
}

export const carOptions = {
    bodyStyle: [
        { value: 'compact', label: 'Compact', price: 22000, previewClass: 'compact' },
        { value: 'roadster', label: 'Roadster', price: 30000, previewClass: 'roadster' },
        { value: 'suv', label: 'Adventure SUV', price: 36000, previewClass: 'suv' },
        { value: 'track', label: 'Track Coupe', price: 42000, previewClass: 'track' }
    ],
    paintColor: [
        { value: 'crimson', label: 'Crimson Red', price: 600, color: '#c52934' },
        { value: 'arctic', label: 'Arctic White', price: 400, color: '#f2f5f7' },
        { value: 'electric', label: 'Electric Blue', price: 950, color: '#1386d8' },
        { value: 'graphite', label: 'Graphite Gray', price: 750, color: '#444a52' }
    ],
    wheelStyle: [
        { value: 'silver', label: 'Silver 18 inch', price: 900 },
        { value: 'black', label: 'Black Sport', price: 1300 },
        { value: 'aero', label: 'Aero Blade', price: 1750 },
        { value: 'rally', label: 'Rally Grip', price: 2100 }
    ],
    interior: [
        { value: 'cloth', label: 'Cloth', price: 0 },
        { value: 'leather', label: 'Leather', price: 1600 },
        { value: 'sport', label: 'Sport Bucket', price: 2400 },
        { value: 'comfort', label: 'Comfort Lounge', price: 2800 }
    ],
    upgradePackage: [
        { value: 'none', label: 'No Package', price: 0 },
        { value: 'tech', label: 'Tech Pack', price: 1750 },
        { value: 'touring', label: 'Touring Pack', price: 2300 },
        { value: 'performance', label: 'Performance Pack', price: 5300 }
    ]
}

export const featureLabels = {
    bodyStyle: 'Body Style',
    paintColor: 'Paint Color',
    wheelStyle: 'Wheels',
    interior: 'Interior',
    upgradePackage: 'Package'
}

export const getOption = (feature, value) => {
    return carOptions[feature].find((option) => option.value === value)
}

export const getOptionLabel = (feature, value) => {
    return getOption(feature, value)?.label || value
}

export const calculateTotalPrice = (car) => {
    return Object.keys(carOptions).reduce((total, feature) => {
        return total + (getOption(feature, car[feature])?.price || 0)
    }, 0)
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount)
}

export const validateCar = (car) => {
    if (!car.name.trim()) {
        return 'Give your custom car a name before saving.'
    }

    if (car.bodyStyle === 'compact' && car.upgradePackage === 'performance') {
        return 'The performance package does not fit the compact body style.'
    }

    if (car.bodyStyle === 'track' && car.interior === 'comfort') {
        return 'The comfort interior is too heavy for the track body style.'
    }

    return ''
}

export const getDisabledReason = (feature, value, car) => {
    const testCar = {
        ...car,
        [feature]: value
    }

    if (testCar.bodyStyle === 'compact' && testCar.upgradePackage === 'performance') {
        return 'Performance is only available on larger body styles.'
    }

    if (testCar.bodyStyle === 'track' && testCar.interior === 'comfort') {
        return 'Track cars cannot use the comfort interior.'
    }

    return ''
}

export const buildPayload = (car) => ({
    ...car,
    name: car.name.trim(),
    totalPrice: calculateTotalPrice(car)
})
