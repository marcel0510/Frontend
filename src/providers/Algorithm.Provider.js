import axios from "axios";

const AlgorithmProviderHandler = axios.create({
  baseURL: "http://127.0.0.1:8001",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const Algorithm = async (parameters) => {
  let URL = "";
  switch(parameters.sessions.length){
    case 1:
      URL =
      `/aulas${parameters.sessions.length}/` +
      `?idSchedule=${parameters.subjectId}` +
      `&startTimeTest=${parameters.sessions[0].startTime}` +
      `&endTimeTest=${parameters.sessions[0].endTime}` +
      `&dayTest=${parameters.sessions[0].day}` +
      `&capacity=${parameters.capacity !== 0 ? parameters.capacity : ""}` +
      `&piso=${parameters.floor !== "" ? parameters.floor : ""}` +
      `&buildCode=${parameters.building !== "" ? parameters.building : ""}` +
      `&isLab=${parameters.isLab}` +
      `&nameLab=${parameters.nameLab !== "" ? parameters.nameLab : ""}`;
      break;
    case 2:
      URL =
      `/aulas${parameters.sessions.length}/` +
      `?idSchedule=${parameters.subjectId}` +
      `&startTimeTest=${parameters.sessions[0].startTime}` +
      `&endTimeTest=${parameters.sessions[0].endTime}` +
      `&dayTest=${parameters.sessions[0].day}` +
      `&capacity=${parameters.capacity !== 0 ? parameters.capacity : ""}` +
      `&piso=${parameters.floor !== "" ? parameters.floor : ""}` +
      `&buildCode=${parameters.building !== "" ? parameters.building : ""}` +
      `&isLab=${parameters.isLab}` +
      `&startTimeTest2=${parameters.sessions[1].startTime}` +
      `&endTimeTest2=${parameters.sessions[1].endTime}` +
      `&dayTest2=${parameters.sessions[1].day}` +
      `&nameLab=${parameters.nameLab !== "" ? parameters.nameLab : ""}`;
      break;
    case 3:
      URL =
      `/aulas${parameters.sessions.length}/` +
      `?idSchedule=${parameters.subjectId}` +
      `&startTimeTest=${parameters.sessions[0].startTime}` +
      `&endTimeTest=${parameters.sessions[0].endTime}` +
      `&dayTest=${parameters.sessions[0].day}` +
      `&capacity=${parameters.capacity !== 0 ? parameters.capacity : ""}` +
      `&piso=${parameters.floor !== "" ? parameters.floor : ""}` +
      `&buildCode=${parameters.building !== "" ? parameters.building : ""}` +
      `&isLab=${parameters.isLab}` +
      `&startTimeTest2=${parameters.sessions[1].startTime}` +
      `&endTimeTest2=${parameters.sessions[1].endTime}` +
      `&dayTest2=${parameters.sessions[1].day}` +
      `&nameLab=${parameters.nameLab !== "" ? parameters.nameLab : ""}` +
      `&startTimeTest3=${parameters.sessions[2].startTime}` +
      `&endTimeTest3=${parameters.sessions[2].endTime}`  +
      `&dayTest3=${parameters.sessions[2].day}` ;
      break;
  
  }
  
    console.log(URL);
    response = await AlgorithmProviderHandler.get(URL);
    return response.data;
    
};
