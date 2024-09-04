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

export interface PageResponse<T> {
    totalPages: number;
    totalElements: number,
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    size: number,
    content: T[]
}

export const getPaginatedSvosts = (offset: number, limit: number, sort?: string) => {
    sort = sort == "" ? "" : "&filter=" + sort;
    return axiosInstance.get<PageResponse<SvostResponse>>(`/svost/?offset=${offset}&limit=${limit}${sort}`, {});
}

export const postNewPost = (content: string) => {
    return axiosInstance.post<SvostResponse>("/svost/", {
        "content": content})
}

export const addNewLike = (id: string) => {
    return axiosInstance.post(`/svost/${id}/like`);
}


export const removeLike = (id: string) => {
    return axiosInstance.delete(`/svost/${id}/like`);
}