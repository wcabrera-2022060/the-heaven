import axios from 'axios'

const apiUrl = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

apiUrl.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => Promise.reject(err)
)

export const registerRequest = async (data) => {
  try {
    return await apiUrl.post('createUser', data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

export const loginRequest = async (data) => {
  try {
    return await apiUrl.post('login', data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

///CRUD HOTEL
//agregar
export const saveHotelRequest = async (hotel) => {
  try {
    return await apiUrl.post('/createHotel', hotel)
  } catch (error) {
    return {
      error: true,
      err
    }
  }
}

//listar
export const getHotelsRequest = async () => {
  try {
    return await apiUrl.get('getHotels')
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//actuailzar
export const updateHotelRequest = async (data, id) => {
  try {
    return await apiUrl.put(`updateHotel/${id}`, data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//eliminar
export const deleteHotelRequest = async (id) => {
  try {
    return await apiUrl.delete(`deleteHotel/${id}`)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}
