const API_URL = '/api/customcars'

const request = async (path = '', options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(data?.error || 'The request could not be completed.')
    }

    return data
}

export const getAllCars = () => request()

export const getCar = (id) => request(`/${id}`)

export const createCar = (car) => request('', {
    method: 'POST',
    body: JSON.stringify(car)
})

export const updateCar = (id, car) => request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(car)
})

export const deleteCar = (id) => request(`/${id}`, {
    method: 'DELETE'
})
