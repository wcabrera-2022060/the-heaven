import axios from 'axios'

const apiUrl = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

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
