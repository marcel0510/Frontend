import axios from 'axios'
import { IP } from '../global/variables';
const UserProviderHandler = axios.create({
    baseURL: `https://${IP}:7130/api/user`
})

export const GetUsers = async () => {
    const response = await UserProviderHandler.get('/');
    return response.data;
}

export const GetUser = async (id) => {
    const response = await UserProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddUser = async (user) => {
    return await UserProviderHandler.post(`/new`, user);
}

export const UpdateUser = async (user) => {
    return await UserProviderHandler.put(`/update`, user);
}

export const DeleteUser = async (user) => {
    return await UserProviderHandler.delete(`/delete/${user.id}/${user.deletedBy}`);
}

export const ChangePassword = async (password) => {
    return await UserProviderHandler.put(`/update/password`, password);
}

export const ValidateUser = async (user) => {
    return await UserProviderHandler.post(`/validate`, user);
}