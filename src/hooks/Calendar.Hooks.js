import { useMutation, useQuery, useQueryClient } from "react-query";
import { GetCalendars, GetCalendar, AddCalendar, UpdateCalendar, DeleteCalendar} from '../providers/Calendar.Provider'

export const useCalendars = () => {
    return useQuery(['GetCalendars'], GetCalendars)
}

export const useCalendar = (id) => {
    return useQuery(['GetCalendar', id], () => GetCalendar(id), { staleTime: 0 });
} 

export const useAddCalendar = () => {
    const queryClient = useQueryClient();
    return useMutation(AddCalendar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetCalendars']);
        }
    })
}

export const useUpdateCalendar = () => {
    const queryClient = useQueryClient();
    return useMutation(UpdateCalendar, {
        onSuccess: () => {
            queryClient.invalidateQueries(['GetCalendars']);
        }
    })
}

export const useDeleteCalendar = () => {
    const queryClient = useQueryClient();
    return useMutation(DeleteCalendar, { 
        onSuccess: () => {
        queryClient.invalidateQueries(['GetCalendars']) 
        }
    });
}
