import { useState } from 'react';
import { saveServiceRequest, getServicesRequest, updateServiceRequest, deleteServiceRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useServiceAdmin = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getServices = async () => {
        setIsLoading(true);
        const res = await getServicesRequest();
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error getting services'
            );
        } else {
            setServices(res.data.services);
        }
    };

    const addService = async (service) => {
        setIsLoading(true);
        const res = await saveServiceRequest(service);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error adding service'
            );
        } else {
            getServices();
            toast.success('Service added');
        }
    };

    const updateService = async (data, id) => {
        setIsLoading(true);
        const res = await updateServiceRequest(data, id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error updating service'
            );
        } else {
            getServices();
            toast.success('Service updated');
        }
    };

    const deleteService = async (id) => {
        setIsLoading(true);
        const res = await deleteServiceRequest(id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error deleting service'
            );
        } else {
            getServices();
            toast.success('Service deleted');
        }
    };

    return {
        services,
        isLoading,
        getServices,
        addService,
        updateService,
        deleteService
    };
};
