import { useQuery } from "@tanstack/react-query";
import { getInstructors } from "../services/userService";

export const useInstructors = () => {
    return useQuery({
        queryKey: ['instructors'],
        queryFn: getInstructors
    })
};