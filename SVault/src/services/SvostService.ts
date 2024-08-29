import {axiosInstance} from "../Api.ts";
import {PeasantResponse} from "./LoginService.ts";

export interface SvostResponse {
    id: string,
    content: string,
    creationdate: string,
    postlike: number,
    peasant: PeasantResponse
}

export const getAllSvosts = () => {
    return axiosInstance.get<SvostResponse[]>("http://localhost:8080/svost/");
}

export const postNewPost = (content: string) => {
    return axiosInstance.post<SvostResponse>("http://localhost:8080/svost/", {
        "content": content})
}

export const getAllLikedSvosts = () => {
    return axiosInstance.get<SvostResponse[]>("http://localhost:8080/svost/likedpost");
}
