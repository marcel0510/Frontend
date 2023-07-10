export const thereIsSession = () => {
    return localStorage.getItem("user");
}

export const thereIsRestore = () => {
    return JSON.parse(localStorage.getItem("user")).reset;
}

export const Restored = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.reset = false;
    localStorage.setItem("user", JSON.stringify(user));
}

export const UpdatedAccount = ({ name, role }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    user.role = role
    localStorage.setItem("user", JSON.stringify(user));
}

export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user)
    return JSON.parse(localStorage.getItem("user")).role === 1
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
        const Reset = JSON.parse(localStorage.getItem("user")).reset
        return {Id, Name, Role, Token, Reset}
    }
    return {Id: 0, Name: "", Role: -1, Token: ""}
    
}
