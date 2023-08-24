import axios from 'axios';
const baseURL = 'http://localhost:3001/user';

export const getAllUsers = async () => {
    const res = await axios.get(baseURL);
    return res.data
}

export const addUserService = async (user) => {
    const res = await axios.post(baseURL, user);
    return res.data;
}

export const getSingleUserService = async (id) => {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
}

export const updateUserService = async (id, user) => {
    const res = await axios.put(`${baseURL}/${id}`, user);
    return res.data;
}

export const deleteUserService = (id) => {
    const res = axios.delete(`${baseURL}/${id}`);
    return res.data;
}