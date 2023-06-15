import { useBuildings } from "../hooks/Building.Hooks";
import { useClassroomsByCalendar } from "../hooks/Classroom.Hooks";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import ClassroomCard from "../components/ClassroomCard";
import ClassroomHeader from "../components/ClassroomHeader";
import { useOutletContext } from "react-router-dom";

export default function Classroom() {
  const [calendar, setCalendar] = useOutletContext();
  const { isLoading: loadBuild, data: buildings } = useBuildings();
  const { isLoading: loadClass, data: classrooms } =
    useClassroomsByCalendar(calendar);
  const [build, setBuild] = useState(0);
  const [floor, setFloor] = useState("");
  const [filterClassroom, setFilterClassroom] = useState([]);
  const [buildFiltered, setBuildFiltered] = useState({});

  useEffect(() => {
    if (calendar !== 0) {
      setCalendar(calendar);
    }
  }, []);

  if (loadBuild || loadClass || calendar === 0)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress size={"8%"} sx={{ marginTop: "15%" }} />
      </Box>
    );

  const findClassrooms = (e) => {
    if (e !== 0) {
      setFilterClassroom([ ...classrooms.filter(c => c.building.id === e) ]);
      //setBuildFiltered({ ...classrooms.find((c) => c.building.id === e) });
    } else setFilterClassroom([]);
    setBuild(e);
    console.log(filterClassroom.length);
  };

  const findClassroomsByFloor = (e) => {
    if (e !== "")
      setFilterClassroom({
        ...filterClassroom,
        classrooms: buildFiltered.classrooms.filter((c) => c.floor === e),
      });
    else setFilterClassroom({ ...filterClassroom });
    console.log(filterClassroom);
    setFloor(e);
  };

  return (
    <>
      <ClassroomHeader
        isLoading={loadBuild}
        buildings={buildings}
        build={build}
        floor={floor}
        findClassrooms={findClassrooms}
        findClassroomsByFloor={findClassroomsByFloor}
      />

      {filterClassroom.length <= 0 ? (
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {classrooms.map((classroom, index) => {
            return (
              <Grid key={index} item md={3.9} marginBottom={"1.3%"}>
                <ClassroomCard classroom={classroom} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {filterClassroom.map((classroom, index) => {
            return (
              <Grid key={index} item md={3.9} marginBottom={"1.3%"}>
                <ClassroomCard classroom={classroom} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
