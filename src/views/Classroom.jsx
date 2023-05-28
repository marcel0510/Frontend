import { useBuildings } from "../hooks/Building.Hooks";
import { useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import ClassroomCard from "../components/ClassroomCard";
import ClassroomHeader from "../components/ClassroomHeader";

export default function Classroom() {
  const { isLoading: dataBuilding, data: buildings } = useBuildings();
  const [build, setBuild] = useState(0);
  const [floor, setFloor] = useState("");

  if (dataBuilding)
    return (
      <Box
        sx={{
          marginLeft: "19.5%",
          width: "79.5%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CircularProgress size={"8%"} sx={{ marginTop: "15%" }} />
      </Box>
    );

  return (
    <>
      <ClassroomHeader
        isLoading={dataBuilding}
        buildings={buildings}
        build={build}
        setBuild={setBuild}
        floor={floor}
        setFloor={setFloor}
      />
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
    </>
  );
}
