import React, { useEffect, useState } from 'react';
import './CreateHotel.css';
import { NavbarA } from '../navbarA/NavbarA'
import { Footer } from '../../header/footer/Footer.jsx';
import { useHotelAdmin } from '../../../hooks/useHotelAdmin.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CreateHotel = () => {
  const { getHotels, hotels, isLoading, addHotel, updateHotel, deleteHotel } = useHotelAdmin();
  const [hotel, setHotel] = useState({
    name: '',
    country: '',
    city: '',
    address: '',
    phone: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
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

  const deleteRow = (index) => {
    const newData = [...hotels];
    newData.splice(index, 1);
    setData(newData);
  };

  const totalPages = Math.ceil(hotels.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;

  const handleSelect = (hotel) => {
    setHotel(hotel);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateHotel(hotel, hotel._id);
      setIsEditing(false);
    } else {
      await addHotel(hotel);
    }
    setHotel({
      name: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      description: ''
    });
  };

  const handleDelete = (id) => {
    deleteHotel(id);
  };

  const handleCellClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setHotel({
      name: '',
      country: '',
      city: '',
      address: '',
      phone: '',
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <>
      <NavbarA />
      <div className="container">
        <div className="formR-container">
          <form className="formRe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name Hotel</label>
              <input type="text" placeholder='Nombre Del Hotel' value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input type="text" placeholder='Pais' value={hotel.country} onChange={(e) => setHotel({ ...hotel, country: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder='Ciudad' value={hotel.city} onChange={(e) => setHotel({ ...hotel, city: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder='Direccion o Ubicacion' value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" placeholder='Telefono Del Hotel' value={hotel.phone} onChange={(e) => setHotel({ ...hotel, phone: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input type="text" placeholder='Descripcion Del Hotel' value={hotel.description} onChange={(e) => setHotel({ ...hotel, description: e.target.value })} required />
            </div>
            <br />
            <button type="submit">{isEditing ? 'Update Hotel' : 'Add Hotel'}</button>
            <br />
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
        <div className="table-container">
          <h1>Manage Hotels</h1>
          <table className="reservation-table">
            <thead>
              <tr>
                <th onClick={() => sortData('hotels')}>Hotels {getSortIcon('hotels')}</th>
                <th onClick={() => sortData('country')}>Country {getSortIcon('country')}</th>
                <th onClick={() => sortData('city')}>City {getSortIcon('city')}</th>
                <th onClick={() => sortData('address')}>Address {getSortIcon('address')}</th>
                <th onClick={() => sortData('phone')}>Phone {getSortIcon('phone')}</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((item) => (
                <tr key={item._id}>
                  <td onClick={() => handleCellClick(item.name)}>{item.name}</td>
                  <td onClick={() => handleCellClick(item.country)}>{item.country}</td>
                  <td onClick={() => handleCellClick(item.city)}>{item.city}</td>
                  <td onClick={() => handleCellClick(item.address)}>{item.address}</td>
                  <td onClick={() => handleCellClick(item.phone)}>{item.phone}</td>
                  <td onClick={() => handleCellClick(item.description)}>{item.description}</td>
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
