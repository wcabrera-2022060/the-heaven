import './Home.css'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { Outstanding } from '../../components/header/outstanding/Outstanding'
import { LikedHotels } from '../../components/header/likedhotels/LikedHotels'
import { Footer } from '../../components/header/footer/Footer'

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Outstanding />
                <h1 className="homeTitle">Hotels that guests love</h1>
                <LikedHotels />
                <Footer />
            </div>
        </div>
    )
}
