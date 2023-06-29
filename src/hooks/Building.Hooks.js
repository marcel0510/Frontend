import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetBuildings, GetBuilding, AddBuilding, UpdateBuilding, DeleteBuilding} from '../providers/Building.Provider'

export const useBuildings = () => {
    return useQuery(['GetBuildings'], GetBuildings)
}

export const useBuilding = (id) => {
    if(id !== undefined)
      return useQuery(['GetBuilding', id], () => GetBuilding(id), { staleTime: 0 });
    return { data: '', isLoadion: '' };
} 

export const useAddBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation(AddBuilding, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetBuildings']);
        },
    })
}

export const useUpdateBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateBuilding, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetBuildings']);
        }
    })
}

export const useDeleteBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteBuilding, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetBuildings'])
        }
    });
}
