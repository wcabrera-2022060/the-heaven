import { useState, useEffect } from 'react'
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useLogin } from '../../hooks/useLogin.jsx'
import { useRegister } from '../../hooks/useRegister.jsx'
import './LoginRegister.css'
import toast from 'react-hot-toast'

export const LoginRegister = () => {
  const [action, setAction] = useState('')
  const [usernameDisable, setUsernameDisable] = useState(false)
  const [emailDisable, setEmailDisable] = useState(false)
  const [passwordDisable, setPasswordDisable] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    watch
  } = useForm()

  const username = watch('username')
  const email = watch('email')

  const {
    register: registerAction,
    isLoading: isLoadingRegister,
    error: errorRegister
  } = useRegister()

  const { login, isLoading } = useLogin()

  useEffect(() => {
    if (!errorRegister && !isLoadingRegister) {
      reset()
    }
  }, [errorRegister, isLoadingRegister])

  useEffect(() => {
    console.log(username, email)
    console.log('entrando')
    if (username) {
      setEmailDisable(true)
    } else {
      setEmailDisable(false)
    }

    if (email) {
      setUsernameDisable(true)
    } else {
      setUsernameDisable(false)
    }
  }, [username, email])

  const registerLink = () => {
    setAction(' active')
    resetLogin()
  }

  const loginLink = () => {
    setAction('')
    reset()
  }

  const onSubmitRegister = (data) => {
    console.log(data)
    if (data.password !== data.confirmPassword) return toast.error('Passwords do not match')
    registerAction(data)
  }

  const onSubmitLogin = (data) => {
    console.log(data)
    login(data)
    resetLogin()
  }

  const handleCheck = (e) => {
    setPasswordDisable(e.target.checked)
  }

  return (
    <>
      <style>
        {`
          html, body {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form
            className="lform"
            onSubmit={handleSubmitLogin(onSubmitLogin)}
          >
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                disabled={usernameDisable}
                {...registerLogin('username')}
              />
              <FaUserAlt className="icons" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                disabled={emailDisable}
                {...registerLogin('email')}
              />
              <FaEnvelope className="icons" />
            </div>
            <div className="input-box">
              <input
                type={passwordDisable ? 'text' : 'password'}
                placeholder="Password"
                required
                {...registerLogin('password')}
              />
              <div className='remember-forgot'>
                <input type="checkbox" checked={passwordDisable} onChange={handleCheck} />
              </div>
              <FaLock className="icons" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember
              </label>
              <a href="#">Forgott password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don´t have an account?{' '}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <h1>Registration</h1>
            <div className="input-box2">
              <input
                type="text"
                placeholder="Name"
                required
                {...register('name')}
              />
            </div>
            <div className="input-box2">
              <input
                type="text"
                placeholder="Surname"
                required
                {...register('surname')}
              />
            </div>
            <div className="input-box2">
              <input
                type="text"
                placeholder="Username"
                required
                {...register('username')}
              />
              <FaUserAlt className="icons" />
            </div>
            <div className="input-box2">
              <input
                type="email"
                placeholder="Email"
                required
                {...register('email')}
              />
              <FaEnvelope className="icons" />
            </div>
            <div className="input-box2">
              <input
                type="password"
                placeholder="Password"
                required
                {...register('password')}
              />
              <FaLock className="icons" />
            </div>
            <div className="input-box2">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                {...register('confirmPassword')}
              />
              <FaLock className="icons" />
            </div>
            <div className="remember-forgot2">
              <label>
                <input type="checkbox" />I agreee to the terms &
                conditions
              </label>
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Already have an account?{' '}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
