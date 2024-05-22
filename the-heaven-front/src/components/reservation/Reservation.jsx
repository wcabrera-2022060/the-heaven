import React, { useState } from 'react'
import './Reservation.css'
import { Navbar } from '../navbar/Navbar'
import { Footer } from '../header/footer/Footer'

export const Reservation = () => {
    const [data, setData] = useState([
        
    ])
    const [sortConfig, setSortConfig] = useState({
        key: 'Hotel',
        direction: 'ascending',
    })
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)

    const sortData = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1
            }
            return 0
        })
        setData(sortedData)
    }

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                return <i className="fa-solid fa-arrow-up sort-icon"></i>
            } else {
                return <i className="fa-solid fa-arrow-down sort-icon"></i>
            }
        }
        return null
    }

    const deleteRow = (index) => {
        const newData = [...data]
        newData.splice(index, 1)
        setData(newData)
    }

    const totalPages = Math.ceil(data.length / rowsPerPage)

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const startIndex = (currentPage - 1) * rowsPerPage
    const selectedData = data.slice(startIndex, startIndex + rowsPerPage)

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="formR-container">
                    <form className="formRe-form">
                        <div className="form-group">
                            <label>Hotel</label>
                            <input type="text" />
                        </div>


                        <div className="form-group">
                            <label>Number of Adults</label>
                            <input type="text" />
                        </div>

                        <div className="form-group">
                            <label>Number of Children</label>
                            <input type="text" />
                        </div>

                        
                        <div className="form-group">
                            <label>Number of Room</label>
                            <input type="text" />
                        </div>

                        
                        <div className="form-group">
                            <label>Entry Date</label>
                            <input type="date" />
                        </div>

                        
                        <div className="form-group">
                            <label>Departure Date</label>
                            <input type="date" />
                        </div>

                        
                        <div className="form-group">
                            <label>Telefono</label>
                            <input type="text" />
                        </div>

                        <button disabled>Add Reservation</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Reservation</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('hotel')}>
                                Hotel{getSortIcon('hotel')}
                                </th>
                                <th onClick={() => sortData('numberA')}>
                                    Number of Adults {getSortIcon('NumberA')}
                                </th>
                                <th onClick={() => sortData('numberC')}>
                                    Number of Children {getSortIcon('NumberC')}
                                </th>
                                <th onClick={() => sortData('numberR')}>
                                    Number of rooms {getSortIcon('NumberR')}
                                </th>
                                <th onClick={() => sortData('entryDate')}>
                                    Entry Date {getSortIcon('entryDate')}
                                </th>
                                <th onClick={() => sortData('departureDate')}>
                                    Departure Date {getSortIcon('departureDate')}
                                </th>
                                <th onClick={() => sortData('telefono')}>
                                    Telefono {getSortIcon('telefono')}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.map((item, index) => (
                                <tr key={startIndex + index}>
                                    <td>{item.hotel}</td>
                                    <td>{item.user}</td>
                                    <td>{item.numberA}</td>
                                    <td>{item.numberC}</td>
                                    <td>{item.numberR}</td>
                                    <td>{item.entryDate}</td>
                                    <td>{item.departureDate}</td>
                                    <td>{item.telefono}</td>
                                    <td>
                                        <button className="edit-button">
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                deleteRow(startIndex + index)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <div className="table-controls">
                            <label>
                                Rows per page:
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => {
                                        setRowsPerPage(Number(e.target.value))
                                        setCurrentPage(1)
                                    }}
                                    className="rows-per-page-select"
                                >
                                    <option value={3}>3</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                </select>
                            </label>
                        </div>
                        <button
                            className="pagination-button"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <span>
                            {startIndex + 1}-{startIndex + selectedData.length}{' '}
                            of {data.length}
                        </span>
                        <button
                            className="pagination-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
