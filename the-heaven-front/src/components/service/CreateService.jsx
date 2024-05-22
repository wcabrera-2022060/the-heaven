import React, { useEffect, useState } from 'react';
import './CreateService.css';
import { Navbar } from '../navbar/Navbar.jsx';
import { Footer } from '../header/footer/Footer.jsx';
import { useServiceAdmin } from '../../hooks/useServiceAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateService = () => {
    const { getServices, services, isLoading, addService, updateService, deleteService } = useServiceAdmin();
    const [service, setService] = useState({
        type: '',
        description: '',
        price: '',
        available: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        getServices();
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

        const sortedData = [...services].sort((a, b) => {
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


    const totalPages = Math.ceil(services.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handleSelect = (service) => {
        setService(service);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateService(service, service._id);
            setIsEditing(false);
        } else {
            await addService(service);
        }
        setService({
            type: '',
            description: '',
            price: '',
            available: ''
        });
    };

    const handleDelete = (id) => {
        deleteService(id);
    };

    const handleCellClick = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setService({
            type: '',
            description: '',
            price: '',
            available: ''
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
                            <label>Type</label>
                            <input type="text" value={service.type} onChange={(e) => setService({ ...service, type: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" value={service.description} onChange={(e) => setService({ ...service, description: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" value={service.price} onChange={(e) => setService({ ...service, price: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Available</label>
                            <select value={service.available} onChange={(e) => setService({ ...service, available: e.target.value })} required>
                                <option value="">Seleccione el estado</option>
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>
                        </div>

                        <br />
                        <button type="submit">{isEditing ? 'Update Service' : 'Add Service'}</button>
                        <br />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Manage Service</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('type')}>Type {getSortIcon('type')}</th>
                                <th onClick={() => sortData('description')}>Description {getSortIcon('description')}</th>
                                <th onClick={() => sortData('price')}>Price {getSortIcon('price')}</th>
                                <th onClick={() => sortData('available')}>Available {getSortIcon('available')}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((item) => (
                                <tr key={item._id}>
                                    <td onClick={() => handleCellClick(item.type)}>{item.type}</td>
                                    <td onClick={() => handleCellClick(item.description)}>{item.description}</td>
                                    <td onClick={() => handleCellClick(item.price)}>{item.price}</td>
                                    <td onClick={() => handleCellClick(item.available)}>
                                        {item.available ? 'Disponible' : 'No disponible'}
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
