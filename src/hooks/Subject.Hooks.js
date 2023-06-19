import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetSubjects, GetSubject, AddSubject, UpdateSubject, DeleteSubject } from "../providers/Subject.Provider";

export const useSubjects = () => {
    return useQuery(['GetSubjects'], GetSubjects)
}

export const useSubject = (id) => {
    if(id !== undefined)
      return useQuery(['GetSubject', id], () => GetSubject(id), { staleTime: 0 });
    return { data: '', isLoadion: '' };
} 

export const useAddSubject = () => {
    const queryClient = useQueryClient();
    return useMutation(AddSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetSubjects']);
        },
        onError: (error) => console.log(error)
    })
}

export const useUpdateSubject = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateSubject, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetSubjects']);
        }
    })
}

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteSubject, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetSubjects']) 
        }
    });
}