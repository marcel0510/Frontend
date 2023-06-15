export const ErrorMap = (errorType) => {
    switch(errorType){
        case 0:
            return "El código de edificio ya está registrado";
        case 1:
            return "Ya existe un edificio con ese código";
    }

}