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

export const GetToday = (addMonth = 0) => {
    const fecha = new Date() ;
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1 + addMonth;
    const year = fecha.getFullYear();

    if(day < 10)
        day = "0"+day;
    if(month < 10)
        month = "0"+month

    return year + '-' + month + '-' + day;
}