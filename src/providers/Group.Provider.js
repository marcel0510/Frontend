import axios from 'axios'
import { GetUser } from '../session/session';
import { IP } from '../global/variables';


const { Token } = GetUser();
const GroupProviderHandler = axios.create({
    baseURL: `https://${IP}:7130/api/Group`,
})

export const GetGroups = async () => {
    const response = await GroupProviderHandler.get('/');
    return response.data;
}

export const GetGroup = async (id) => {
    const response = await GroupProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddGroup = async (Group) => {
    return await GroupProviderHandler.post(`/new`, Group, { headers: { Authorization: `Bearer ${Token}` } });
}

export const UpdateGroup = async (group) => {
    return await GroupProviderHandler.put(`/update`, group, { headers: { Authorization: `Bearer ${Token}` }});
}

export const DeleteGroup = async (group) => {
    return await GroupProviderHandler.delete(`/delete/${group.id}/${group.deletedBy}`, { headers: { Authorization: `Bearer ${Token}` }});
}