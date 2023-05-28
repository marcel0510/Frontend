import axios from 'axios'

const classroomProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/classroom'
})

export const GetClassrooms = async () => {
    const response = await classroomProviderHandler.get('/');
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

export const NewCalendar = async (oldCalendarId, newCalendarId) => {
    return await classroomProviderHandler.put(`/newCalendar/${oldCalendarId}/${newCalendarId}`);
}