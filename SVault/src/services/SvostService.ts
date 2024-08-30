import {axiosInstance} from "../Api.ts";
import {PeasantResponse} from "./LoginService.ts";

export interface SvostResponse {
    id: string,
    content: string,
    creationdate: string,
    postlike: number,
    peasant: PeasantResponse
    liked: boolean
}

export const getAllSvosts = () => {
    return axiosInstance.get<SvostResponse[]>("http://localhost:8080/svost/");
}

export const postNewPost = (content: string) => {
    return axiosInstance.post<SvostResponse>("http://localhost:8080/svost/", {
        "content": content})
}

export const addNewLike = (id: string) => {
    return axiosInstance.post(`http://localhost:8080/svost/${id}/like`);
}


export const removeLike = (id: string) => {
    return axiosInstance.delete(`http://localhost:8080/svost/${id}/like`);
}