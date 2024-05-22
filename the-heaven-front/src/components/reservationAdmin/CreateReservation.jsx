import React, { useEffect, useState } from 'react';
import './CreateReservation.css';
import { Navbar } from '../navbar/Navbar.jsx';
import { Footer } from '../header/footer/Footer.jsx';
import { useReservationAdmin } from '../../hooks/useReservationAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateReservation = () => {
    const { getReservations, reservations, isLoading, addReservation, updateReservation, deleteReservation } = useReservationAdmin();
    const [reservation, setReservation] = useState({
        room: '',
        user: '',
        numberAdults: '',
        numberKids: '',
        numberRooms: '',
        dateIn: '',
        dateOut: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        getReservations();
    }, []);

    const [sortConfig, setSortConfig] = useState({
        key: 'reservation',
        direction: 'ascending'
    });
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...reservations].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                return <i className="fa-solid fa-arrow-up sort-icon"></i>;
            } else {
                return <i className="fa-solid fa-arrow-down sort-icon"></i>;
            }
        }
        return null;
    };

    const totalPages = Math.ceil(reservation.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handleSelect = (reservation) => {
        setReservation(reservation);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateReservation(reservation, reservation._id);
            setIsEditing(false);
        } else {
            await addReservation(reservation);
        }
        setReservation({
            room: '',
            user: '',
            numberAdults: '',
            numberKids: '',
            numberRooms: '',
            dateIn: '',
            dateOut: ''
        });
    };

    const handleDelete = (id) => {
        deleteReservation(id);
    };

    const handleCellClick = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setReservation({
            room: '',
            user: '',
            numberAdults: '',
            numberKids: '',
            numberRooms: '',
            dateIn: '',
            dateOut: ''
        });
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="formR-container">
                    <form className="formRe-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Room</label>
                            <input type="text" value={reservation.room} onChange={(e) => setReservation({ ...reservation, room: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>User</label>
                            <input type="text" value={reservation.user} onChange={(e) => setReservation({ ...reservation, user: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Number Adults</label>
                            <input type="text" value={reservation.numberAdults} onChange={(e) => setReservation({ ...reservation, numberAdults: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Number Kids</label>
                            <input type="text" value={reservation.numberKids} onChange={(e) => setReservation({ ...reservation, numberKids: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Number Rooms</label>
                            <input type="text" value={reservation.numberRooms} onChange={(e) => setReservation({ ...reservation, numberRooms: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Date In</label>
                            <input type="date" value={reservation.dateIn} onChange={(e) => setReservation({ ...reservation, dateIn: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Date Out</label>
                            <input type="date" value={reservation.dateOut} onChange={(e) => setReservation({ ...reservation, dateOut: e.target.value })} required />
                        </div>

                        <br />
                        <button type="submit">{isEditing ? 'Update Reservation' : 'Add Reservation'}</button>
                        <br />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Manage Reservation</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('room')}>Room {getSortIcon('room')}</th>
                                <th onClick={() => sortData('user')}>User {getSortIcon('user')}</th>
                                <th onClick={() => sortData('numberAdults')}>Number Adults {getSortIcon('numberAdults')}</th>
                                <th onClick={() => sortData('numberKids')}>Number Kids {getSortIcon('numberKids')}</th>
                                <th onClick={() => sortData('numberRooms')}>Number Rooms {getSortIcon('numberRooms')}</th>
                                <th onClick={() => sortData('dateIn')}>Date In{getSortIcon('dateIn')}</th>
                                <th onClick={() => sortData('dateOut')}>Date Out {getSortIcon('dateOut')}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((item) => (
                                <tr key={item._id}>
                                    <td onClick={() => handleCellClick(item.room)}>{item.room}</td>
                                    <td onClick={() => handleCellClick(item.user)}>{item.user}</td>
                                    <td onClick={() => handleCellClick(item.numberAdults)}>{item.numberAdults}</td>
                                    <td onClick={() => handleCellClick(item.numberKids)}>{item.numberKids}</td>
                                    <td onClick={() => handleCellClick(item.numberRooms)}>{item.numberRooms}</td>
                                    <td onClick={() => handleCellClick(item.dateIn)}>{item.dateIn}</td>
                                    <td onClick={() => handleCellClick(item.dateOut)}>{item.dateOut}</td>
                                    <td>
                                        <div className="button-container">
                                            <button className="edit-button" onClick={() => handleSelect(item)}>Edit</button>
                                            <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </div>
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
                                        setRowsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="rows-per-page-select"
                                >
                                    <option value={3}>3</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                </select>
                            </label>
                        </div>
                        <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Cell Content"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div>{modalContent}</div>
            </Modal>
        </>
    );
};
