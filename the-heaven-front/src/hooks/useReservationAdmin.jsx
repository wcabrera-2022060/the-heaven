import { useState } from 'react';
import { saveReservationRequest, getReservationsRequest, updateReservationRequest, deleteReservationRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useReservationAdmin = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getReservations = async () => {
        setIsLoading(true);
        const res = await getReservationsRequest();
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error getting reservations'
            );
        } else {
            setReservations(res.data.reservation);
        }
    };

    const addReservation = async (reservation) => {
        setIsLoading(true);
        const res = await saveReservationRequest(reservation);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error adding reservation'
            );
        } else {
            getReservations();
            toast.success('Reservation added');
        }
    };

    const updateReservation = async (data, id) => {
        setIsLoading(true);
        const res = await updateReservationRequest(data, id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error updating reservation'
            );
        } else {
            getReservations();
            toast.success('Reservation updated');
        }
    };

    const deleteReservation = async (id) => {
        setIsLoading(true);
        const res = await deleteReservationRequest(id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error deleting reservation'
            );
        } else {
            getReservations();
            toast.success('Reservation deleted');
        }
    };

    return {
        reservations,
        isLoading,
        getReservations,
        addReservation,
        updateReservation,
        deleteReservation
    };
};
