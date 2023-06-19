import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetClassrooms, GetClassroomsByCalendar, GetClassroom, AddClassroom, UpdateClassroom, DeleteClassroom, DeleteByBuilding } from '../providers/Classroom.Provider'

export const useClassrooms = () => {
    return useQuery(['GetClassrooms'], GetClassrooms)
}

export const useClassroomsByCalendar = (id) => {
    return useQuery(['GetClassroomsByCalendar', id], () => GetClassroomsByCalendar(id))
}


export const useClassroom = (id) => {
    return useQuery(['GetClassroom', id], () => GetClassroom(id), { staleTime: 0 });
} 

export const useAddClassroom = () => {
    const queryClient = useQueryClient();
    return useMutation(AddClassroom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetClassrooms']);
        }
    })
}

export const useUpdateClassroom = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateClassroom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetClassrooms']);
        }
    })
}

export const useDeleteClassroom = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteClassroom, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetClassrooms']) 
        }
    });
}

export const useDeleteByBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteByBuilding, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetClassrooms']) 
        }
    });
}
