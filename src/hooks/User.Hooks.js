import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetUsers, GetUser, AddUser, UpdateUser, DeleteUser, ValidateUser} from '../providers/User.Provider'

export const useUsers = () => {
    return useQuery(['GetUsers'], GetUsers)
}

export const useUser = (id) => {
    return useQuery(['GetUser', id], () => GetUser(id), { staleTime: 0 });
} 

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation(AddUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetUsers']);
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetUsers']);
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteUser, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetUsers']) 
        }
    });
}

export const useValidateUser = () => {
    return useMutation(ValidateUser)
}
