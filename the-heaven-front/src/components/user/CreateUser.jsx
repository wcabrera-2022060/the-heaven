import React, { useEffect, useState } from 'react';
import './CreateUser.css';
import { Navbar } from '../navbar/Navbar.jsx';
import { Footer } from '../header/footer/Footer.jsx';
import { useUserAdmin } from '../../hooks/useUserAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateUser = () => {
    const { getUsers, users, isLoading, addUser, updateUser, deleteUser } = useUserAdmin();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        role: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
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

        const sortedData = [...hotels].sort((a, b) => {
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

    const totalPages = Math.ceil(users.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * rowsPerPage;

    const handleSelect = (user) => {
        setUser(user);
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateUser(user, user._id);
            setIsEditing(false);
        } else {
            await addUser(user);
        }
        setUser({
            name: '',
            surname: '',
            username: '',
            email: '',
            role: ''
        });
    };

    const handleDelete = (id) => {
        deleteUser(id);
    };

    const handleCellClick = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setUser({
            name: '',
            surname: '',
            username: '',
            email: '',
            role: ''
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
                            <label>Name</label>
                            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" value={user.surname} onChange={(e) => setUser({ ...user, surname: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} required />
                        </div>
                        <br />
                        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
                        <br />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="table-container">
                    <h1>Manage Users</h1>
                    <table className="reservation-table">
                        <thead>
                            <tr>
                                <th onClick={() => sortData('name')}>Name {getSortIcon('users')}</th>
                                <th onClick={() => sortData('surname')}>Surname {getSortIcon('surname')}</th>
                                <th onClick={() => sortData('username')}>Username {getSortIcon('username')}</th>
                                <th onClick={() => sortData('email')}>Email {getSortIcon('email')}</th>
                                <th onClick={() => sortData('role')}>Role {getSortIcon('role')}</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item) => (
                                <tr key={item._id}>
                                    <td onClick={() => handleCellClick(item.name)}>{item.name}</td>
                                    <td onClick={() => handleCellClick(item.surname)}>{item.surname}</td>
                                    <td onClick={() => handleCellClick(item.username)}>{item.username}</td>
                                    <td onClick={() => handleCellClick(item.email)}>{item.email}</td>
                                    <td onClick={() => handleCellClick(item.role)}>{item.role}</td>
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
