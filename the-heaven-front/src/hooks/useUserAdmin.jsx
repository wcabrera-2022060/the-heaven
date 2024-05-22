import { useState } from 'react';
import { saveUserRequest, getUsersRequest, updateUserRequest, deleteUserRequest } from '../services/api.js';
import toast from 'react-hot-toast';

export const useUserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = async () => {
        setIsLoading(true);
        const res = await getUsersRequest();
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error getting users'
            );
        } else {
            setUsers(res.data.users);
        }
    };

    const addUser = async (user) => {
        setIsLoading(true);
        const res = await saveUserRequest(user);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error adding user'
            );
        } else {
            getUsers();
            toast.success('User added');
        }
    };

    const updateUser = async (data, id) => {
        setIsLoading(true);
        const res = await updateUserRequest(data, id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error updating user'
            );
        } else {
            getUsers();
            toast.success('User updated');
        }
    };

    const deleteUser = async (id) => {
        setIsLoading(true);
        const res = await deleteUserRequest(id);
        setIsLoading(false);
        if (res.err) {
            toast.error(
                res.error?.response?.data?.message || 'Error deleting user'
            );
        } else {
            getUsers();
            toast.success('User deleted');
        }
    };

    return {
        users,
        isLoading,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    };
};
