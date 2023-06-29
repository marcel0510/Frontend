import { useMutation } from "react-query";
import { Algorithm } from "../providers/Algorithm.Provider";

export const useAlgorithm = () => {
        return useMutation(Algorithm)
}