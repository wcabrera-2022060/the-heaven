import { useState } from 'react';
import { saveEventRequest, getEventsRequest, updateEventRequest, deleteEventRequest } from '../services/api.js';
import toast from 'react-hot-toast';

// Hook personalizado para gestionar eventos
export const useEventAdmin = () => {
    // Estado para almacenar los eventos
    const [events, setEvents] = useState([]);
    // Estado para el estado de carga
    const [isLoading, setIsLoading] = useState(false);

    // Función para obtener todos los eventos
    const getEvents = async () => {
        setIsLoading(true); // Establecer el estado de carga en verdadero
        const res = await getEventsRequest(); // Hacer la solicitud API para obtener eventos
        console.log(res);
        setIsLoading(false); // Establecer el estado de carga en falso
        if (res.err) {
            // Mostrar un toast de error si hay un error
            toast.error(
                res.error?.response?.data?.message || 'Error obteniendo eventos'
            );
        } else {
            // Actualizar el estado de eventos con los datos obtenidos
            setEvents(res.data.event);
        }
    };

    // Función para agregar un nuevo evento
    const addEvent = async (event) => {
        setIsLoading(true); // Establecer el estado de carga en verdadero
        const res = await saveEventRequest(event); // Hacer la solicitud API para guardar el evento
        setIsLoading(false); // Establecer el estado de carga en falso
        if (res.err) {
            // Mostrar un toast de error si hay un error
            toast.error(
                res.error?.response?.data?.message || 'Error agregando evento'
            );
        } else {
            // Obtener la lista actualizada de eventos y mostrar un toast de éxito
            getEvents();
            toast.success('Evento agregado');
        }
    };

    // Función para actualizar un evento existente
    const updateEvent = async (data, id) => {
        setIsLoading(true); // Establecer el estado de carga en verdadero
        const res = await updateEventRequest(data, id); // Hacer la solicitud API para actualizar el evento
        setIsLoading(false); // Establecer el estado de carga en falso
        if (res.err) {
            // Mostrar un toast de error si hay un error
            toast.error(
                res.error?.response?.data?.message || 'Error actualizando evento'
            );
        } else {
            // Obtener la lista actualizada de eventos y mostrar un toast de éxito
            getEvents();
            toast.success('Evento actualizado');
        }
    };

    // Función para eliminar un evento
    const deleteEvent = async (id) => {
        setIsLoading(true); // Establecer el estado de carga en verdadero
        const res = await deleteEventRequest(id); // Hacer la solicitud API para eliminar el evento
        setIsLoading(false); // Establecer el estado de carga en falso
        if (res.err) {
            // Mostrar un toast de error si hay un error
            toast.error(
                res.error?.response?.data?.message || 'Error eliminando evento'
            );
        } else {
            // Obtener la lista actualizada de eventos y mostrar un toast de éxito
            getEvents();
            toast.success('Evento eliminado');
        }
    };

    // Retornar los eventos y las funciones para gestionarlos
    return {
        events,
        isLoading,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent
    };
};
