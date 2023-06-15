export const ErrorMap = (errorType) => {
    switch(errorType){
        case 0:
            return "El periodo del calendario ya está registrado";
        case 1:
            return "Ya existe un edificio con ese código";
    }

}