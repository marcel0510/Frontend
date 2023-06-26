import { Box, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function GroupAlgorithm() {

    const [ calendar, _1, _2, setIsSee ] = useOutletContext();
    const [ filters, setFilters ] = useState({
        nameGr: "",
        subjectId: 0,
        isLab: false,
        nameLab: "",
        sessions: [
            {
                day: -1,
                hourInit: "07:00:00",
                hourEnd: "09:00:00",

            }
        ],
        capacity: 10,
        building: "",
        floor: "",
        calendar: calendar
    });
    const [ isForm, setIsForm ] = useState(true);
    
    useEffect(() => {
        setIsSee(false);
    }, [])
    return(
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Paper sx={{ mt: 2, mb: 5, padding: "10px 2.5%", width: "75%" }}>
                <Typography variant="h4" align="center" >{isForm ? "Insertar parámetros del algoritmo" : "Resultados"}</Typography>
            </Paper>
            <Outlet context={[ filters, setFilters, setIsForm  ]} />
        </Box>
    );
}