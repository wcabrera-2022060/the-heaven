import { useState } from 'react'
import { loginRequest } from '../services/api.js'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState()

  const login = async (data) => {
    setIsLoading(true)
    const res = await loginRequest(data)
    setIsLoading(false)

    if (res.err) {
      toast.error(
        res.error?.response?.data?.message ||
        'Error login'
      )
    }

    if (!res.err) {
      const expirationDate = new Date(Date.now() + 3 * 60 * 60 * 1000)
      document.cookie = `token=${res.data.token}; expires=${expirationDate.toUTCString()}; path=/`
      localStorage.setItem('token', res.data.token)
      toast.success(
        res.data?.message
      )
    }
  }

  return {
    login,
    isLoading
  }
}
