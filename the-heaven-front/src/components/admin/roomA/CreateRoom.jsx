import { useEffect, useState } from 'react';
import './CreateRoom.css';
import { NavbarA } from '../navbarA/NavbarA'
import { useRoomAdmin } from '../../../hooks/useRoomAdmin.jsx';
import { useHotelAdmin } from '../../../hooks/useHotelAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateRoom = () => {
    const { getHotels, hotels } = useHotelAdmin();
    const { getRooms, rooms, isLoading, addRoom, updateRoom, deleteRoom } = useRoomAdmin();
    const [room, setRoom] = useState({
        type: '',
        price: '',
        description: '',
        aviability: '',
        hotel: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        getRooms();
        getHotels();
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

        const sortedData = [...rooms].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setRooms(sortedData);
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

    const totalPages = Math.ceil(rooms.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handleSelect = (room) => {
        setRoom(room);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateRoom(room, room._id);
            setIsEditing(false);
        } else {
            await addRoom(room);
        }
        setRoom({
            type: '',
            price: '',
            description: '',
            aviability: '',
            hotel: ''
        });
    };

    const handleDelete = (id) => {
        deleteRoom(id);
    };

    const handleCellClick = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setRoom({
            type: '',
            price: '',
            description: '',
            aviability: '',
            hotel: ''
        });
        setIsEditing(false);
    };

    const getHotelNameById = (id) => {
        const hotel = hotels.find(hotel => hotel._id === id);
        return hotel ? hotel.name : 'Unknown';
    };

    return (
        <>
            <NavbarA />
            <div className="container">
                <div className="formR-container">
                    <form className="formRe-form" onSubmit={handleSubmit}>
                        <div className="form-group select-container">
                            <label>Type</label>
                            <select value={room.type} onChange={(e) => setRoom({ ...room, type: e.target.value })} required>
                                <option value="">Seleccione el tipo de habitación</option>
                                <option value="STANDARD">Standard</option>
                                <option value="TWIN">Twin</option>
                                <option value="FAMILY">Family</option>
                                <option value="VIP">VIP</option>
                                <option value="SUITE">Suite</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="text"  placeholder='Precio Habitacion' value={room.price} onChange={(e) => setRoom({ ...room, price: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" placeholder='Descripcion Habitacion' value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} required />
                        </div>

                        <div className="form-group select-container">
                            <label>Aviability</label>
                            <select value={room.aviability} onChange={(e) => setRoom({ ...room, aviability: e.target.value })} required>
                                <option value="">Seleccione el estado</option>
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>
                        </div>

                        <div className="form-group select-container">
                            <label>Hotel</label>
                            <select value={room.hotel} onChange={(e) => setRoom({ ...room, hotel: e.target.value })} required>
                                <option value="">Seleccione el hotel</option>
                                {hotels.map((hotel) => (
                                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <button type="submit">{isEditing ? 'Update Room' : 'Add Room'}</button>
                        <br />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Manage Rooms</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('type')}>Type {getSortIcon('type')}</th>
                                <th onClick={() => sortData('price')}>Price {getSortIcon('price')}</th>
                                <th>Description</th>
                                <th onClick={() => sortData('aviability')}>Aviability {getSortIcon('aviability')}</th>
                                <th>Hotel</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.slice(startIndex, startIndex + rowsPerPage).map((item) => (
                                <tr key={item._id}>
                                    <td onClick={() => handleCellClick(item.type)}>{item.type}</td>
                                    <td onClick={() => handleCellClick(item.price)}>{item.price}</td>
                                    <td onClick={() => handleCellClick(item.description)}>{item.description}</td>
                                    <td onClick={() => handleCellClick(item.aviability)}>
                                        {item.aviability ? 'Disponible' : 'No disponible'}
                                    </td>
                                    <td onClick={() => handleCellClick(getHotelNameById(item.hotel))}>
                                        {getHotelNameById(item.hotel)}
                                    </td>
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

                {isModalOpen && (
                    <>
                        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>
                        <div className="modal">
                            <p>{modalContent}</p>
                        </div>
                    </>
                )}
            </div>
            
        </>
    );
};
