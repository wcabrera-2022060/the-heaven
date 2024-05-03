import { LoginRegister } from './pages/LoginRegistration/LoginRegister.jsx'
import { ParticlesComponent } from './components/Particlesbg.jsx'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<><ParticlesComponent /> <LoginRegister /></>} />
      </Routes>
      <Toaster position='top-center' reverseOrder={false}/>
    </div>
  )
}

export default App
