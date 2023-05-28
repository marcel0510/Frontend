import axios from 'axios'

const BuildingProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/building'
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
    return await BuildingProviderHandler.post(`/new`, building);
}

export const UpdateBuilding = async (building) => {
    return await BuildingProviderHandler.put(`/update/${building.Id}`, building);
}

export const DeleteBuilding = async (id) => {
    return await BuildingProviderHandler.delete(`/delete/${id}`);
}