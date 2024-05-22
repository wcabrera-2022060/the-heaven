import { useState } from 'react';
import { saveRoomRequest, getRoomsRequest, updateRoomRequest, deleteRoomRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useRoomAdmin = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRooms = async () => {
        setIsLoading(true);
        const res = await getRoomsRequest();
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error getting rooms'
            );
        } else {
            setRooms(res.data.rooms);
        }
    };

    const addRoom = async (room) => {
        setIsLoading(true);
        const res = await saveRoomRequest(room);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error adding room'
            );
        } else {
            getRooms();
            toast.success('Room added');
        }
    };

    const updateRoom = async (data, id) => {
        setIsLoading(true);
        const res = await updateRoomRequest(data, id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error updating room'
            );
        } else {
            getRooms();
            toast.success('Room updated');
        }
    };

    const deleteRoom = async (id) => {
        setIsLoading(true);
        const res = await deleteRoomRequest(id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error deleting room'
            );
        } else {
            getRooms();
            toast.success('Room deleted');
        }
    };

    return {
        rooms,
        isLoading,
        getRooms,
        addRoom,
        updateRoom,
        deleteRoom
    };
};
