import { useQuery } from "react-query";
import { Algorithm, Disponibility } from "../providers/Algorithm.Provider";

export const useAlgorithm = (parameters) => {
        return useQuery(["AlgorithmResults", parameters], () => Algorithm(parameters));
}

export const useDisponibility = (parameters) => {
        return useQuery(["DisponibilityResults", parameters], () => Disponibility(parameters));
}