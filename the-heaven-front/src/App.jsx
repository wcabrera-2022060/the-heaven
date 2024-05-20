import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home'
import { ListH } from './pages/list/ListH'
import { Hotel } from './pages/hotel/Hotel'
import { LoginRegister } from './pages/LoginRegistration/LoginRegister'
import { ParticlesComponent } from '../src/components/particles/Particlesbg'
import { Toaster } from 'react-hot-toast'
import { Reservation } from './components/reservation/Reservation'
import Aboutus from './components/aboutus/Aboutus'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/hotels" element={<ListH />}></Route>
                <Route path="/aboutus" element={<Aboutus />}></Route>
                <Route path="/hotels/:id" element={<Hotel />}></Route>
                <Route
                    path="/hotels/:id/Reservation"
                    element={<Reservation />}
                ></Route>
                <Route
                    path="/signin"
                    element={
                        <>
                            <LoginRegister />
                            <ParticlesComponent />
                        </>
                    }
                ></Route>
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default App
