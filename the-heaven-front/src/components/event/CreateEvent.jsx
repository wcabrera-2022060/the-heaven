import React, { useEffect, useState } from 'react';
import './CreateEvent.css';
import { Navbar } from '../navbar/Navbar.jsx';
import { Footer } from '../header/footer/Footer.jsx';
import { useEventAdmin } from '../../hooks/useEventAdmin.jsx';
import { useHotelAdmin } from '../../hooks/useHotelAdmin.jsx';
import { useUserAdmin } from '../../hooks/useUserAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateEvent = () => {
    const { getHotels, hotels } = useHotelAdmin();
    const { getUsers, users } = useUserAdmin();
    const { getEvents, events, isLoading, addEvent, updateEvent, deleteEvent } = useEventAdmin();
    const [event, setEvent] = useState({
        user: '',
        hotel: '',
        date: '',
        type: '',
        guests: '',
        price: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        getEvents();
        getHotels();
        getUsers();
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

        const sortedData = [...events].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        set(sortedData);
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

    const totalPages = Math.ceil(events.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handleSelect = (event) => {
        setEvent(event);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateEvent(event, event._id);
            setIsEditing(false);
        } else {
            await addEvent(event);
        }
        setEvent({
            user: '',
            hotel: '',
            date: '',
            type: '',
            guests: '',
            price: ''
        });
    };

    const handleDelete = (id) => {
        deleteEvent(id);
    };

    const handleCellClick = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setEvent({
            user: '',
            hotel: '',
            date: '',
            type: '',
            guests: '',
            price: ''
        });
        setIsEditing(false);
    };

    const getHotelNameById = (id) => {
        const hotel = hotels.find(hotel => hotel._id === id);
        return hotel ? hotel.name : 'Unknown';
    };


    const getUserNameById = (id) => {
        const user = users.find(user => user._id === id);
        return user ? user.name : 'Unknown';
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="formR-container">
                    <form className="formRe-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User</label>
                            <select value={event.user} onChange={(e) => setEvent({ ...event, user: e.target.value })} required>
                                <option value="">Seleccione el usuario</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>{user.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Hotel</label>
                            <select value={event.hotel} onChange={(e) => setEvent({ ...event, hotel: e.target.value })} required>
                                <option value="">Seleccione el hotel</option>
                                {hotels.map((hotel) => (
                                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <input type="text" value={event.type} onChange={(e) => setEvent({ ...event, type: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Guests</label>
                            <input type="text" value={event.guests} onChange={(e) => setEvent({ ...event, guests: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" value={event.price} onChange={(e) => setEvent({ ...event, price: e.target.value })} required />
                        </div>
                        <br />
                        <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
                        <br />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Manage Event</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('user')}>User {getSortIcon('user')}</th>
                                <th onClick={() => sortData('hotel')}>Hotel {getSortIcon('hotel')}</th>
                                <th onClick={() => sortData('date')}>Date {getSortIcon('date')}</th>
                                <th onClick={() => sortData('type')}>Type {getSortIcon('type')}</th>
                                <th onClick={() => sortData('guests')}>Guests {getSortIcon('guests')}</th>
                                <th onClick={() => sortData('price')}>Price {getSortIcon('price')}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((item) => (
                                <tr key={item._id}>
                                    <td onClick={() => handleCellClick(getUserNameById(item.user._id))}>
                                        {getUserNameById(item.user._id)}
                                    </td>
                                    <td onClick={() => handleCellClick(getHotelNameById(item.hotel._id))}>
                                        {getHotelNameById(item.hotel._id)}
                                    </td>
                                    <td onClick={() => handleCellClick(item.date)}>{item.date}</td>
                                    <td onClick={() => handleCellClick(item.type)}>{item.type}</td>
                                    <td onClick={() => handleCellClick(item.guests)}>{item.guests}</td>
                                    <td onClick={() => handleCellClick(item.price)}>{item.price}</td>
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
