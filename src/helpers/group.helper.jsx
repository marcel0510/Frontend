export const ErrorMap = (errorType) => {
    switch (errorType) {
      case 1:
        return "El código de edificio ya está registrado";
      case 2:
        return "Ya existe un edificio con ese código";
      case 3:
        return "No se lograron eliminar las aulas asociadas";
    }
  };