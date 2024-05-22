import './Header.css'
import HomeImg from '../../videos/background2.mp4'
import { DateRange } from 'react-date-range'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export const Header = ({ type }) => {
    const [destination, setDestination] = useState('')
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const navigate = useNavigate()
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]:
                    operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])

    const handleSearch = () => {
        navigate('/hotels', { state: { destination, date, options } })
    }

    return (
        <>
            {type !== 'list' && (
                <>
                    <div
                        className={
                            type === 'list' ? 'header listMode' : 'header'
                        }
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: '-10',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <source
                                src={HomeImg}
                                alt="HeroImg"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className="header-text">
                        <h1>The Heaven</h1>
                        <p>Enjoy our hotels</p>
                    </div>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <i className="fa-solid fa-bed"></i>
                            <input
                                type="text"
                                placeholder="where are you going?"
                                className="headerSearchInput"
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="headerSearchItem">
                            <i className="fa-solid fa-calendar-days"></i>
                            <span
                                onClick={() => setOpenDate(!openDate)}
                                className="headerSearchText"
                            >{`${format(
                                date[0].startDate,
                                'MM/dd/yyyy'
                            )} to ${format(
                                date[0].endDate,
                                'MM/dd/yyyy'
                            )}`}</span>
                            {openDate && (
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) =>
                                        setDate([item.selection])
                                    }
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                        <div className="headerSearchItem">
                            <i className="fa-solid fa-person"></i>
                            <span
                                onClick={() => setOpenOptions(!openOptions)}
                                className="headerSearchText"
                            >
                                {`${options.adult} adult - ${options.children} children -  ${options.room} room`}
                            </span>
                            {openOptions && (
                                <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">
                                            Adult
                                        </span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.adult <= 1}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption('adult', 'd')
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.adult}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption('adult', 'i')
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">
                                            Children
                                        </span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.children <= 0}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption(
                                                        'children',
                                                        'd'
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.children}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption(
                                                        'children',
                                                        'i'
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.room <= 1}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption('room', 'd')
                                                }
                                            >
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.room}
                                            </span>
                                            <button
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption('room', 'i')
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="headerSearchItem">
                            <button
                                className="headerBtn"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
