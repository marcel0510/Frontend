export const GetDate = (date) => {
    let day = date.$D;
    let month = (date.$M + 1);
    const year = date.$y 

    if(day < 10)
        day = "0"+day;
    if(month < 10)
        month = "0"+month

    return year + "-" + month + "-" + day;

}

export const GetTime = (time) => {
    let hour = time.$H;
    let minutes = time.$m;

    if(hour < 10){
        hour = "0"+hour;
    }
    if(minutes < 10)
        minutes = "0"+minutes;

    return hour + ":" + minutes;
}

export const GetToday = (addMonth = 0) => {
    const fecha = new Date() ;
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1 + addMonth;
    const year = fecha.getFullYear();

    if(month > 12)
        month = month - 12;

    if(day < 10)
        day = "0"+day;
    if(month < 10)
        month = "0"+month

    return year + '-' + month + '-' + day;
}

export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}`;
  
    return formattedTime;
  };
  
  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  export const DayMap = (day) => {
    switch(day){
        case 0: return "Lunes";
        case 1: return "Martes";
        case 2: return "Miercoles";
        case 3: return "Jueves";
        case 4: return "Viernes";
    }
  }