import './ListH.css'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import { SearchItem } from '../../components/searchItem/SearchItem'
import { Footer } from '../../components/header/footer/Footer'

export const ListH = () => {
    const location = useLocation()

    // Verificar si location.state está disponible y contiene los datos necesarios
    const initialDestination = location.state?.destination || ''
    const initialDate = location.state?.date || [
        { startDate: new Date(), endDate: new Date(), key: 'selection' },
    ]
    const initialOptions = location.state?.options || {
        adult: 1,
        children: 0,
        room: 1,
    }

    const [destination, setDestination] = useState(initialDestination)
    const [date, setDate] = useState(initialDate)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(initialOptions)

    const handleSearch = () => {
        // Lógica para manejar la búsqueda, usando los estados locales.
        console.log('Searching with:', { destination, date, options })
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listHContainer">
                <div className="listHWrapper">
                    <div className="listHSearch">
                        <h1 className="title">Search</h1>
                        <div className="listItem">
                            <label>Destination</label>
                            <input
                                placeholder="Enter destination"
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="listItem">
                            <label>Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(
                                    date[0].startDate,
                                    'MM/dd/yyyy'
                                )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) =>
                                        setDate([item.selection])
                                    }
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}
                        </div>
                        <div className="listItem">
                            <label>Options</label>
                            <div className="lstOp">
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Adult
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="listOpInput"
                                        value={options.adult}
                                        onChange={(e) =>
                                            setOptions({
                                                ...options,
                                                adult: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="listOpInput"
                                        value={options.children}
                                        onChange={(e) =>
                                            setOptions({
                                                ...options,
                                                children: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="listOpInput"
                                        value={options.room}
                                        onChange={(e) =>
                                            setOptions({
                                                ...options,
                                                room: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Min Price <small>at night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listOpInput"
                                        onChange={(e) =>
                                            setOptions({
                                                ...options,
                                                minPrice: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Max Price <small>at night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listOpInput"
                                        onChange={(e) =>
                                            setOptions({
                                                ...options,
                                                maxPrice: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="listHResult">
                        <SearchItem />
                        <div className="moreContainer">
                            <button className="more">More</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
