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

///CRUD ROOM
//agregar
export const saveRoomRequest = async (room) => {
  try {
    return await apiUrl.post('/createRoom', room)
  } catch (error) {
    return {
      error: true,
      err
    }
  }
}

//listar
export const getRoomsRequest = async () => {
  try {
    return await apiUrl.get('getRooms')
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//actuailzar
export const updateRoomRequest = async (data, id) => {
  try {
    return await apiUrl.put(`updateRoom/${id}`, data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//eliminar
export const deleteRoomRequest = async (id) => {
  try {
    return await apiUrl.delete(`deleteRoom/${id}`)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//CRUD USUARIO
//agregar
export const saveUserRequest = async (user) => {
  try {
    return await apiUrl.post('/createUser', user)
  } catch (error) {
    return {
      error: true,
      err
    }
  }
}

//listar
export const getUsersRequest = async () => {
  try {
    return await apiUrl.get('getUsers')
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//actuailzar
export const updateUserRequest = async (data, id) => {
  try {
    return await apiUrl.put(`updateUserAdmin/${id}`, data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//eliminar
export const deleteUserRequest = async (id) => {
  try {
    return await apiUrl.delete(`deleteUserAdmin/${id}`)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//CRUD SERVICE
//agregar
export const saveServiceRequest = async (user) => {
  try {
    return await apiUrl.post('/createService', user)
  } catch (error) {
    return {
      error: true,
      error
    }
  }
}

//listar
export const getServicesRequest = async () => {
  try {
    return await apiUrl.get('getServices')
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//actuailzar
export const updateServiceRequest = async (data, id) => {
  try {
    return await apiUrl.put(`updateService/${id}`, data)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}

//eliminar
export const deleteServiceRequest = async (id) => {
  try {
    return await apiUrl.delete(`deleteService/${id}`)
  } catch (error) {
    return {
      err: true,
      error
    }
  }
}