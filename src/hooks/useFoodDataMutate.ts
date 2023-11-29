import axios, {AxiosPromise} from "axios";
import { FoodData } from "../interfaces/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + '/food', data);
    return response;
}

export function useFoodDataMutate() {
    const queryCliente = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryCliente.invalidateQueries(['food-data'])
        }
    })

    return mutate;

}