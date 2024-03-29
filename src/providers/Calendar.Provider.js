import axios from 'axios'
import { GetUser } from '../session/session';
import { IP } from '../global/variables';

const { Token } = GetUser();
const calendarProviderHandler = axios.create({
    baseURL: `${IP}:7130/api/calendar`
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
    return await calendarProviderHandler.post(`/new`, calendar,  { headers: { Authorization: `Bearer ${Token}` } });
}

export const UpdateCalendar = async (calendar) => {
    return await calendarProviderHandler.put(`/update`, calendar, { headers: { Authorization: `Bearer ${Token}` } });
}
 
export const DeleteCalendar = async (calendar) => {
    return await calendarProviderHandler.delete(`/delete/${calendar.id}/${calendar.deletedBy}`, { headers: { Authorization: `Bearer ${Token}` }});
}