import { useBuildings } from "../hooks/Building.Hooks";
import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import ClassroomCard from "../components/ClassroomCard";
import ClassroomHeader from "../components/ClassroomHeader";

export default function Classroom() {
  const { isLoading: dataBuilding, data: buildings } = useBuildings();
  const [build, setBuild] = useState(0);
  const [floor, setFloor] = useState("");
  const [filterClassroom, setFilterClassroom] = useState({});
  const [buildFiltered, setBuildFiltered] = useState({});

  if (dataBuilding)
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
      setFilterClassroom({ ...buildings.find((b) => b.id === e) });
      setBuildFiltered({ ...buildings.find((b) => b.id === e) });
    } else setFilterClassroom({});
    setBuild(e);
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
        isLoading={dataBuilding}
        buildings={buildings}
        build={build}
        floor={floor}
        findClassrooms={findClassrooms}
        findClassroomsByFloor={findClassroomsByFloor}
      />
      {Object.keys(filterClassroom).length === 0 ? (
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {buildings.map((building) => {
            return building.classrooms.map((classroom, index) => {
              return (
                <Grid key={index} item md={3.9} marginBottom={"1.3%"}>
                  <ClassroomCard
                    classroom={classroom}
                    buildName={building.name}
                    buildCode={building.code}
                  />
                </Grid>
              );
            });
          })}
        </Grid>
      ) : (
        <Grid container sx={{ marginTop: "1.5%", width: "100%", gap: "1%" }}>
          {filterClassroom.classrooms.map((classroom, index) => {
            return (
              <Grid key={index} item md={3.9} marginBottom={"1.3%"}>
                <ClassroomCard
                  classroom={classroom}
                  buildName={filterClassroom.name}
                  buildCode={filterClassroom.code}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
