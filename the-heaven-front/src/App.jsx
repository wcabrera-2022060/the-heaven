import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { ParticlesComponent } from '../src/components/particles/Particlesbg.jsx'
import './App.css'
import Aboutus from './components/aboutus/Aboutus.jsx'
import { Reservation } from './components/reservation/Reservation.jsx'
import { LoginRegister } from './pages/LoginRegistration/LoginRegister.jsx'
import { Home } from './pages/home/Home.jsx'
import { Hotel } from './pages/hotel/Hotel.jsx'
import { CreateHotel } from './components/hotel/CreateHotel.jsx'
import { CreateRoom } from './components/room/CreateRoom.jsx'
import { CreateUser } from './components/user/CreateUser.jsx'
import { ListH } from './pages/list/ListH.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<ListH />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/hotels/:id/Reservation" element={<Reservation />} />
        <Route path="/signin"
          element={
            <>
              <LoginRegister />
              <ParticlesComponent />
            </>
          }
        />
        <Route path='createHotel' element={<CreateHotel />} />
        <Route path='createRoom' element={<CreateRoom />} />
        <Route path='createUser' element={<CreateUser />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
