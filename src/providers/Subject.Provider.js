import axios from 'axios'
import { GetUser } from '../session/session';
import { IP } from '../global/variables';

const { Token } = GetUser();
const SubjectProviderHandler = axios.create({
    baseURL: `https://${IP}:7130/api/subject`,
})

export const GetSubjects = async () => {
    const response = await SubjectProviderHandler.get('/');
    return response.data;
}

export const GetSubject = async (id) => {
    const response = await SubjectProviderHandler.get(`/${id}`);
    return response.data;
}

export const AddSubject = async (subject) => {
    return await SubjectProviderHandler.post(`/new`, subject, { headers: { Authorization: `Bearer ${Token}` }});
}

export const UpdateSubject = async (subject) => {
    return await SubjectProviderHandler.put(`/update`, subject, { headers: { Authorization: `Bearer ${Token}` }});
}

export const DeleteSubject = async (subject) => {
    return await SubjectProviderHandler.delete(`/delete/${subject.id}/${subject.deletedBy}`, { headers: { Authorization: `Bearer ${Token}` }});
}