export const thereIsSession = () => {
    return localStorage.getItem("user");
}

export const isAdmin = () => {
    return JSON.parse(localStorage.getItem("user")).role === 0
} 

export const EndSession = () => {
    localStorage.removeItem("user");
}

export const GetUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        const Id = JSON.parse(localStorage.getItem("user")).id;
        const Name = JSON.parse(localStorage.getItem("user")).name;
        const Role = JSON.parse(localStorage.getItem("user")).role;
        const Token = JSON.parse(localStorage.getItem("user")).token
        return {Id, Name, Role, Token}
    }
    return {Id: 0, Name: "", Role: -1, Token: ""}
    
}
export const ManageSession = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
        const timeSession = 60 * 1000;
        const storedTime = user.currentTime;
        const now = Date.now();
        const elapsedTime = now - storedTime;
        if(elapsedTime >= timeSession){
            localStorage.removeItem("user");
        }
    }
}