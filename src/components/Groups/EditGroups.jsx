import { Backdrop, CircularProgress, Typography } from "@mui/material";
import {
  RenderComponent,
  ValidateForm,
  ErrorMap,
} from "../../helpers/group.helper";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useClassrooms } from "../../hooks/Classroom.Hooks";
import { useGroup, useUpdateGroup } from "../../hooks/Group.Hooks";
import { GetUser } from "../../session/session";
import dayjs from "dayjs";

export default function EditGroups() {
  const { Id } = GetUser();

  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  const withoutErrors = {
    name: { error: false },
    subjectId: { error: false },
    classroomId: { error: false },
    sessions: { error: false },
  };
  const [calendar, calendars, setIsEditGroup, isEdit, setIsEdit] =
    useOutletContext(); //Informacion del padre
  const navigate = useNavigate(); //Navegador de la aplicacion
  const { id } = useParams(); //Informacion del URL
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
    data: group,
    isLoading: loadGroup,
    isError: errorGroup,
  } = useGroup(id);
  const {
    mutate: edit,
    isLoading: isLoadUpdate,
    isError: errorUpdate,
  } = useUpdateGroup();
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [currentCalendar, setCurrentCalendar] = useState("");
  const [initHours, setInitHours] = useState([dayjs("0000/00/00T07:00")]);
  const [endHours, setEndHours] = useState([dayjs("0000/00/00T09:00")]);
  const [form, setForm] = useState({
    id: id,
    name: "",
    subjectId: 0,
    classroomId: 0,
    calendarId: 0,
    sessions: [
      {
        day: -1,
        startTime: "07:00:00",
        endTime: "09:00:00",
      },
    ],
    updatedBy: Id,
  });
  const [formErrors, setFormErrors] = useState(withoutErrors);
  const [filters, setFilters] = useState({
    subjectName: "",
    classroomCode: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  //Estado para controlar los errores generales
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const LoadCalendar = calendar && calendars;
  const isLoading = loadSubjects || loadClassrooms || loadGroup;
  const isError = errorSubjects || errorClassrooms || errorGroup;

  useEffect(() => {
    if (!isLoading && isInitialMount.current) {
      setSubjects(subjectsData);
      setClassrooms(classroomsData);
      isInitialMount.current = false;
    }
    if (!isLoading && LoadCalendar) {
      setCurrentCalendar(calendars.find((c) => c.id == calendar));
     
      setForm({
        ...form,
        name: group.name,
        subjectId: group.subject.id,
        classroomId: group.classroom.id,
        calendarId: calendar,
        sessions: group.sessions,
      });
      console.log(group.sessions);
      fillDates();
    }
    setIsEditGroup(true);
    setIsEdit(true);
    filterData();
    return () => {
      setIsEditGroup(false);
      setIsEdit(false);
    };
  }, [filters, isLoading, subjectsData, classroomsData, calendar, calendars]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm(form, setFormErrors)) {
      edit(
        { ...form },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) setSuccessMessage(true);
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

  const fillDates = () => {
    const iHours = [];
    const eHours = [];
    group.sessions.forEach((session) => {
      iHours.push(dayjs(`0000/00/00T${session.startTime}`));
      eHours.push(dayjs(`0000/00/00T${session.endTime}`));
    });
    setInitHours(iHours);
    setEndHours(eHours);
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
          isEdit
        )
      }
      {/* Pantalla de carga */}
      {isLoading || isError || isLoadUpdate ? (
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
          {isError || errorUpdate ? (
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
