import { useState } from 'react';
import { getHotelsRequest, updateHotelRequest, deleteHotelRequest, saveHotelRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useHotelAdmin = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHotels = async () => {
    setIsLoading(true);
    const res = await getHotelsRequest();
    setIsLoading(false);
    if (res.err) {
      toast.error(
        res.error?.response?.data?.message || 'Error getting hotels'
      );
    } else {
      setHotels(res.data.hotels);
    }
  };

  const addHotel = async (hotel) => {
    setIsLoading(true);
    const res = await saveHotelRequest(hotel);
    setIsLoading(false);
    if (res.err) {
      toast.error(
        res.error?.response?.data?.message || 'Error adding hotel'
      );
    } else {
      getHotels();
      toast.success('Hotel added');
    }
  };

  const updateHotel = async (data, id) => {
    setIsLoading(true);
    const res = await updateHotelRequest(data, id);
    setIsLoading(false);
    if (res.err) {
      toast.error(
        res.error?.response?.data?.message || 'Error updating hotel'
      );
    } else {
      getHotels();
      toast.success('Hotel updated');
    }
  };

  const deleteHotel = async (id) => {
    setIsLoading(true);
    const res = await deleteHotelRequest(id);
    setIsLoading(false);
    if (res.err) {
      toast.error(
        res.error?.response?.data?.message || 'Error deleting hotel'
      );
    } else {
      getHotels();
      toast.success('Hotel deleted');
    }
  };

  return {
    hotels,
    isLoading,
    getHotels,
    addHotel,
    updateHotel,
    deleteHotel
  };
};
