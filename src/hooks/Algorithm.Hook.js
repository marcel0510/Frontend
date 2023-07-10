import { useQuery } from "react-query";
import { Algorithm } from "../providers/Algorithm.Provider";

export const useAlgorithm = (parameters) => {
        return useQuery(["AlgorithmResults", parameters], () => Algorithm(parameters))
}