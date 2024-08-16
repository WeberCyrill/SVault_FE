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
