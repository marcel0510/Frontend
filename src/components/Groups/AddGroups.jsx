import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  ValidateForm,
  ErrorMap,
} from "../../helpers/group.helper";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSubjects } from "../../hooks/Subject.Hooks";
import { useClassrooms } from "../../hooks/Classroom.Hooks";
import { useAddGroup } from "../../hooks/Group.Hooks";
import { GetUser } from "../../session/session";
import dayjs from "dayjs";

export default function AddGroups() {
  const { Id } = GetUser();
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const withoutErrors = {
    name: { error: false },
    subjectId: { error: false },
    classroomId: { error: false },
    sessions: { error: false },
  };
  const [calendar, calendars, , isEdit] = useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const isInitialMount = useRef(true);
  const {
    data: subjectsData,
    isLoading: loadSubjects,
    isError: errorSubjects,
  } = useSubjects();
  const {
    data: classroomsData,
    isLoading: loadClassrooms,
    isError: errorClassrooms,
  } = useClassrooms();
  const {
    mutate: add,
    isLoading: isLoadAdd,
    isError: isErrorAdd,
  } = useAddGroup();
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [currentCalendar, setCurrentCalendar] = useState("");
  const [initHours, setInitHours] = useState([dayjs("0000/00/00T07:00")]);
  const [endHours, setEndHours] = useState([dayjs("0000/00/00T09:00")]);
  const [form, setForm] = useState({
    name: "",
    subjectId: 0,
    classroomId: 0,
    calendarId: 0,
    sessions: [
      {
        day: -1,
        startTime: "07:00",
        endTime: "09:00",
      },
    ],
    createdBy: Id
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [filters, setFilters] = useState({
    subjectName: "",
    classroomCode: "",
  });
  //Estado para controlar el mensaje exito
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });

  const LoadCalendar = calendar && calendars;
  const isLoading = loadSubjects || loadClassrooms;
  const isError = errorSubjects || errorClassrooms;

  useEffect(() => {
    if (!isLoading && isInitialMount.current) {
      setSubjects(subjectsData);
      setClassrooms(classroomsData);
      isInitialMount.current = false;
    }
    if (!isLoading && LoadCalendar) {
      setCurrentCalendar(calendars.find((c) => c.id == calendar));
      setForm({ ...form, calendarId: calendar });
    }
    filterData();
  }, [filters, isLoading, subjectsData, classroomsData, calendar, calendars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)

    if (ValidateForm(form, setFormErrors)) {
      add(
        { ...form },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.data.isSuccess) {
              setSuccessMessage(true);
            }
            else {
              if (res.data.errorType == 2) {
                const currectGroups = classrooms.find(
                  (c) => c.id === form.classroomId
                )["groups"];
                const currentGroup = currectGroups.find(
                  (g) => g.id === res.data.overlappingGrs[0]
                );
                setErrorMessage({
                  error: true,
                  message: ErrorMap(res.data.errorType, { ...currentGroup }),
                });
              } else {
                const gr = form.name;
                const subject = subjects.find((s) => s.id == form.subjectId)[
                  "name"
                ];
                setErrorMessage({
                  error: true,
                  message: ErrorMap(res.data.errorType, {
                    gr: gr,
                    subject: subject,
                  }),
                });
              }
            }
          },
          onError: (error) => {
            setErrorMessage({ error: true, message: error.message });
          },
        }
      );
    }
  };

  const filterData = () => {
    if (filters.subjectName !== "")
      setSubjects(
        subjectsData.filter((s) => {
          if (s.alias !== null)
            return (
              s.name.includes(filters.subjectName) ||
              s.alias.includes(filters.subjectName) ||
              s.code.includes(filters.subjectName)
            );
          else
            return (
              s.name.includes(filters.subjectName) ||
              s.code.includes(filters.subjectName)
            );
        })
      );
    else if (!isLoading && !isInitialMount.current) setSubjects(subjectsData);

    if (filters.classroomCode !== "")
      setClassrooms(
        classroomsData.filter((c) => {
          const code = c.building.code + "/" + c.floor + "/" + c.code;
          return code.includes(filters.classroomCode);
        })
      );
    else if (!isLoading && !isInitialMount.current)
      setClassrooms(classroomsData);
  };

  return (
    <>
      {
        //Renderizar formulario
        RenderComponent(
          navigate,
          handleSubmit,
          form,
          setForm,
          formErrors,
          setFormErrors,
          withoutErrors,
          successMessage,
          setSuccessMessage,
          errorMessage,
          setErrorMessage,
          initHours,
          setInitHours,
          endHours,
          setEndHours,
          days,
          subjects,
          classrooms,
          currentCalendar,
          setCurrentCalendar,
          filters,
          setFilters,
          isEdit,
        )
      }
      {/* Pantalla de carga */}
      {isLoading || isError || isLoadAdd ? (
        <Backdrop
          open={true}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {isError || isErrorAdd ? (
            <Typography mb={"1.5%"} variant="h5" color="secondary">
              Error de conexión con el servidor!
            </Typography>
          ) : (
            <p></p>
          )}
          <CircularProgress size={100} />
        </Backdrop>
      ) : (
        <p />
      )}
    </>
  );
}
