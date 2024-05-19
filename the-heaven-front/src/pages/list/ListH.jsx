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
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)

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
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="listItem">
                            <label>Date</label>
                            <span
                                onClick={() => setOpenDate(!openDate)}
                            >{`${format(
                                date[0].startDate,
                                'MM/dd/yyyy'
                            )} to ${format(
                                date[0].endDate,
                                'MM/dd/yyyy'
                            )}`}</span>
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
                                        placeholder={options.adult}
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
                                        placeholder={options.children}
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="listOpInput"
                                        placeholder={options.room}
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Min Price <small>at night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listOpInput"
                                    />
                                </div>
                                <div className="listOpItem">
                                    <span className="listOptionText">
                                        Max Price <small>at night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className="listOpInput"
                                    />
                                </div>
                            </div>
                        </div>
                        <button>Search</button>
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
