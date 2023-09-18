import axios from "axios";

const AlgorithmProviderHandler = axios.create({
  baseURL: "http://127.0.0.1:8001",
});

export const Algorithm = async (parameters) => {
  if (parameters) {
    let URL = "";
    if(!parameters.isParameters) {
      parameters.capacity = 0;
      parameters.floor = "";
      parameters.building = "";
    } 
    switch (parameters.sessions.length) {
      case 1:
        URL =
          `/aulas${parameters.sessions.length}/` +
          `?idSchedule=${parameters.subjectId}` +
          `&startTimeTest=${parameters.sessions[0].startTime}` +
          `&endTimeTest=${parameters.sessions[0].endTime}` +
          `&dayTest=${parameters.sessions[0].day}` +
          `&capacity=${
            parameters.capacity !== 0 ? parameters.capacity : 0 //session 1
          }` +
          `&piso=${parameters.floor !== "" ? parameters.floor : null}` +
          `&buildCode=${
            parameters.building !== "" ? parameters.building : null
          }` +
          `&isLab=${parameters.isLab}` +
          `&nameLab=${parameters.isLab ? parameters.nameLab : null}`;
        break;
      case 2:
        URL =
          `/aulas${parameters.sessions.length}/` +
          `?idSchedule=${parameters.subjectId}` +
          `&startTimeTest=${parameters.sessions[0].startTime}` +
          `&endTimeTest=${parameters.sessions[0].endTime}` +
          `&dayTest=${parameters.sessions[0].day}` +
          `&capacity=${
            parameters.capacity !== 0 ? parameters.capacity : 0 //session 2
          }` +
          `&piso=${parameters.floor !== "" ? parameters.floor : null}` +
          `&buildCode=${
            parameters.building !== "" ? parameters.building : null
          }` +
          `&isLab=${parameters.isLab}` +
          `&startTimeTest2=${parameters.sessions[1].startTime}` +
          `&endTimeTest2=${parameters.sessions[1].endTime}` +
          `&dayTest2=${parameters.sessions[1].day}` +
          `&nameLab=${parameters.isLab ? parameters.nameLab : null}`;
        break;
      case 3:
        URL =
          `/aulas${parameters.sessions.length}/` +
          `?idSchedule=${parameters.subjectId}` +
          `&startTimeTest=${parameters.sessions[0].startTime}` +
          `&endTimeTest=${parameters.sessions[0].endTime}` +
          `&dayTest=${parameters.sessions[0].day}` +
          `&capacity=${
            parameters.capacity !== 0 ? parameters.capacity : 0 //session3
          }` +
          `&piso=${parameters.floor !== "" ? parameters.floor : null}` +
          `&buildCode=${
            parameters.building !== "" ? parameters.building : null
          }` +
          `&isLab=${parameters.isLab}` +
          `&startTimeTest2=${parameters.sessions[1].startTime}` +
          `&endTimeTest2=${parameters.sessions[1].endTime}` +
          `&dayTest2=${parameters.sessions[1].day}` +
          `&nameLab=${parameters.isLab ? parameters.nameLab : null}` +
          `&startTimeTest3=${parameters.sessions[2].startTime}` +
          `&endTimeTest3=${parameters.sessions[2].endTime}` +
          `&dayTest3=${parameters.sessions[2].day}`;
        break;
    }

    console.log(URL);
    const response = await AlgorithmProviderHandler.get(URL);
    return response.data;
  }
};

export const Disponibility = async (parameters) =>{
  if(parameters){
    const URL = `/disponibility/?idSchedule=${parameters.calendar}` +
    `&dayTest=${parameters.day}` +
    `&piso=${parameters.floor}` +
    `&buildCode=${parameters.building}` +
    `&morning=${parameters.morning}`
    console.log(URL);
    const response = await AlgorithmProviderHandler.get(URL);
    return response.data;
  }
}
