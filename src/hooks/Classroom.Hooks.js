import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetClassrooms, GetClassroom, AddClassroom, UpdateClassroom, DeleteClassroom, NewCalendar } from '../providers/Classroom.Provider'

export const useClassrooms = () => {
    return useQuery(['GetClassrooms'], GetClassrooms)
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

export const useNewCalendar = () => {
    const queryClient = useQueryClient();
    return useMutation(NewCalendar, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetClassrooms']) 
        }
    });
}
