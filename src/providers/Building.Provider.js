import axios from 'axios'


const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
const BuildingProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/building',
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
    return await BuildingProviderHandler.post(`/new`, building, { headers: { Authorization: `Bearer ${UserInfo.token}` } });
}

export const UpdateBuilding = async (building) => {
    return await BuildingProviderHandler.put(`/update`, building, { headers: { Authorization: `Bearer ${UserInfo.token}` }});
}

export const DeleteBuilding = async (building) => {
    return await BuildingProviderHandler.put(`/delete`, building, { headers: { Authorization: `Bearer ${UserInfo.token}` }});
}