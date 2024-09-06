import axios from "axios";

export interface PeasantResponse {
    "name": string,
    "password": string,
    "profilepicture": string,
    "email": string,
    "role": {
        "name": string,
        "authorities": Authoritiy[]
    }
}


interface Authoritiy {
    name: string
}


export const accessUser = (name: string, password:string) => {
   return axios.get<PeasantResponse>("http://localhost:8080/user/detail", {
        headers: {
            'Authorization': 'Basic ' + btoa(name + ':' + password),
        }
    });
}
