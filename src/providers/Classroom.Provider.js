import axios from 'axios'
import { GetUser } from '../session/session';


const { Token } = GetUser();

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
    return await classroomProviderHandler.post('/new', classroom, { headers: { Authorization: `Bearer ${Token}` } });
}

export const UpdateClassroom = async (classroom) => {
    return await classroomProviderHandler.put(`/update`, classroom, { headers: { Authorization: `Bearer ${Token}` } });
}

export const DeleteClassroom = async (classroom) => {
    return await classroomProviderHandler.delete(`/delete/${classroom.id}/${classroom.deletedBy}`, { headers: { Authorization: `Bearer ${Token}` } });
}
