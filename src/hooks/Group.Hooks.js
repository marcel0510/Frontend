import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetGroups, GetGroup, AddGroup, UpdateGroup, DeleteGroup} from '../providers/Group.Provider'

export const useGroups = () => {
    return useQuery(['GetGroups'], GetGroups)
}

export const useGroup = (id) => {
    if(id !== undefined)
      return useQuery(['GetGroup', id], () => GetGroup(id), { staleTime: 0 });
    return { data: '', isLoadion: '' };
} 

export const useAddGroup = () => {
    const queryClient = useQueryClient();
    return useMutation(AddGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetGroups']);
        },
        onError: (error) => console.log(error)
    })
}

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateGroup, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetGroups']);
        }
    })
}

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteGroup, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetGroups']) 
        }
    });
}
