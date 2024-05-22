import { useState } from 'react';
import { saveEventRequest, getEventsRequest, updateEventRequest, deleteEventRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useEventAdmin = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getEvents = async () => {
        setIsLoading(true);
        const res = await getEventsRequest();
        console.log(res)
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error getting events'
            );
        } else {
            setEvents(res.data.event);
        }
    };

    const addEvent = async (event) => {
        setIsLoading(true);
        const res = await saveEventRequest(event);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error adding event'
            );
        } else {
            getEvents();
            toast.success('Event added');
        }
    };

    const updateEvent = async (data, id) => {
        setIsLoading(true);
        const res = await updateEventRequest(data, id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error updating event'
            );
        } else {
            getEvents();
            toast.success('Event updated');
        }
    };

    const deleteEvent = async (id) => {
        setIsLoading(true);
        const res = await deleteEventRequest(id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error deleting event'
            );
        } else {
            getEvents();
            toast.success('Event deleted');
        }
    };

    return {
        events,
        isLoading,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent
    };
};
