export const RoleMap = (role) => {
  switch (role) {
    case 0:
      return "Función sin asignar";
    case 1:
      return "Administrador";
    case 2:
      return "Coordinador de Eléctrica";
    case 3:
      return "Coordinador de Control";
    case 4:
      return "Coordinador de Telecomunicaciones";
    case 5:
      return "Coordinador de Tecnologías de la Información";
  }
};

export const ErrorMap = (errorType) => {
  switch (errorType) {
    case 0:
      return "No se puede eliminar el usuario principal";
    case 1:
      return "El correo ingresado ya existe";
    case 2:
      return "Ya existe un usuario con ese rol";
    case 3:
      return "Las contraseñas no coinciden";
    case 4:
      return "No puede usar la misma contraseña";
  }
};

export const ValidateForm = (form, setFormErrors, isEdit) => {
  const errors = {
    name: {},
    email: {},
    password: {},
    repPassword: {},
    role: {},
  };
  var validate = true;
  if (form.name === "") {
    errors["name"]["error"] = true;
    errors["name"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }

  if (form.email === "") {
    errors["email"]["error"] = true;
    errors["email"]["message"] = "No puede dejar este campo vacío";
    validate = false;
  }

  if (!isEdit) {
    if (form.role === -1) {
      errors["role"]["error"] = true;
      errors["role"]["message"] = "Debe seleccionar un role";
      validate = false;
    }
    if (form.password === "") {
      errors["password"]["error"] = true;
      errors["password"]["message"] = "No puede dejar este campo vacío";
      validate = false;
    } else if (form.password.length <= 8) {
      errors["password"]["error"] = true;
      errors["password"]["message"] =
        "La contraseña debe tener más de 8 caracteres ";
      validate = false;
    }
    if (form.repPassword === "") {
      errors["repPassword"]["error"] = true;
      errors["repPassword"]["message"] = "No puede dejar este campo vacío";
      validate = false;
    }
    if (
      form.password !== "" &&
      form.repPassword !== "" &&
      form.password !== form.repPassword
    ) {
      errors["password"]["error"] = true;
      errors["password"]["message"] = "Las contraseñas deben coincidir ";
      errors["repPassword"]["error"] = true;
      errors["repPassword"]["message"] = "Las contraseñas deben coincidir";
      validate = false;
    }
  }

  if (validate) return true;
  else {
    setFormErrors(errors);
    return false;
  }
};

export const GetRandomPassword = () => {
  var caracteres =
    "ASBCDEFGHIJKLMNÑOPQRSTUVWXUZabcdefghaijklmnñopqrstuvwxyz123456789./*-!@#$%*&";
  var length = 8;
  var randomString = "";

  for (let i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * caracteres.length);
    randomString += caracteres.charAt(index);
  }
  return randomString;
};
