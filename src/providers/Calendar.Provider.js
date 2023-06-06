import axios from 'axios'

const calendarProviderHandler = axios.create({
    baseURL: 'https://localhost:7130/api/calendar'
})

export const GetCalendars = async () => {
    const response = await calendarProviderHandler.get('/');
    return response.data;
}

export const GetCalendar = async (id) => {
    const response = await calendarProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddCalendar = async (calendar) => {
    return await calendarProviderHandler.post(`/new`, calendar);
}

export const UpdateCalendar = async (calendar) => {
    return await calendarProviderHandler.put(`/update/${calendar.Id}`, calendar);
}

export const DeleteCalendar = async (id) => {
    return await calendarProviderHandler.delete(`/delete/${id}`);
}