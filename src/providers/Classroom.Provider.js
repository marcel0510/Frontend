import axios from 'axios'

const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
const classroomProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/classroom'
})

export const GetClassrooms = async () => {
    const response = await classroomProviderHandler.get('/');
    return response.data;
}

export const GetClassroomsByCalendar = async (id) => {
    const response = await classroomProviderHandler.get(`/byCalendar/${id}`);
    return response.data;
}


export const GetClassroom = async (id) => {
    const response = await classroomProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddClassroom = async (classroom) => {
    return await classroomProviderHandler.post('/new', classroom);
}

export const UpdateClassroom = async (classroom) => {
    return await classroomProviderHandler.put(`/update/${classroom.Id}`, classroom);
}

export const DeleteClassroom = async (id) => {
    return await classroomProviderHandler.delete(`/delete/${id}`);
}

export const DeleteByBuilding = async ({buildingId, userId}) => {
    return await classroomProviderHandler.delete(`/deleteByBuilding/${buildingId}/${userId}`, { headers: { Authorization: `Bearer ${UserInfo.token}` }});
}