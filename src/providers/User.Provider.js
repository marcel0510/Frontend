import axios from 'axios'

const UserProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/user'
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
    return await UserProviderHandler.put(`/update/${user.Id}`, user);
}

export const DeleteUser = async (id) => {
    return await UserProviderHandler.delete(`/delete/${id}`);
}

export const ValidateUser = async (user) => {
    return await UserProviderHandler.post(`/validate`, user);
}