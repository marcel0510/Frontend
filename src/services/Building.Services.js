
export const distinct = (build, index) => {
    var oldIndex = [];
    var newIndex = [];
        for(let i = 0; i < build.classrooms.length; i++){
            if(oldIndex.indexOf(build.classrooms[i][index]) < 0 ){
                newIndex.push(build.classrooms[i][index]);
                oldIndex.push(build.classrooms[i][index]);
            }
        }

    return newIndex;
}

export const findClassroom = (classrooms, floor) => {
    const classroomsFound = classrooms.find(classroom => {
        classroom.floor == floor
    })

    return classroomsFound;
}
