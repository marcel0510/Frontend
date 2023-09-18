import { IP } from '../global/variables';
import { GetUser } from '../session/session';
import axios from 'axios'


const { Token } = GetUser();
const BuildingProviderHandler = axios.create({
    baseURL: `${IP}:7130/api/building`,
})

export const GetBuildings = async () => {
    const response = await BuildingProviderHandler.get('/');
    return response.data;
}

export const GetBuilding = async (id) => {
    const response = await BuildingProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddBuilding = async (building) => {
    return await BuildingProviderHandler.post(`/new`, building, { headers: { Authorization: `Bearer ${Token}` } });
}

export const UpdateBuilding = async (building) => {
    return await BuildingProviderHandler.put(`/update`, building, { headers: { Authorization: `Bearer ${Token}` }});
}

export const DeleteBuilding = async (building) => {
    return await BuildingProviderHandler.delete(`/delete/${building.id}/${building.deletedBy}`, { headers: { Authorization: `Bearer ${Token}` }});
}