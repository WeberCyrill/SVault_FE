import {createContext, useState} from "react";
import {PageResponse, SvostResponse} from "../services/SvostService.ts";
import {boolean} from "yup";

export type PostContextState = {
    svosts: SvostResponse[];
    addSvost: (value: SvostResponse) => void;
    setSvosts: (value: SvostResponse[]) => void;
    modifySvost: (value: SvostResponse) => void;
    sort: string;
    setSort: (filter: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageInfo: PageResponse<SvostResponse>;
    setPageInfo: (pageInfo: PageResponse<SvostResponse>) => void;
    isSearching: boolean;
    setIsSearching: (isSearching: boolean) => void;
};

const contextDefaultValues: PostContextState = {
    svosts: [],
    setSvosts: () => {
    },
    addSvost: () => {
    },
    modifySvost: () => {
    },
    sort: "",
    setSort: () => {
    },
    currentPage: 1,
    setCurrentPage: () => {
    },
    pageInfo: {
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 0,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: true
        },
        size: 0,
        content: []
    },
    setPageInfo: () => {},
    isSearching: false,
    setIsSearching: () => {},

};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);

    const addSvost = (value: SvostResponse) => (setSvosts([...svosts, {...value, liked: false}]));
    const modifySvost = (value: SvostResponse) => {
        const newSvosts: SvostResponse[] = svosts;
        const targetIndex = svosts.findIndex((svostData) => (value.id === svostData.id))
        newSvosts[targetIndex] = value;
        setSvosts([...newSvosts]);
    };


    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState<string>("");

    const [pageInfo, setPageInfo] = useState<PageResponse<SvostResponse>>({
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 0,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: true
        },
        size: 0,
        content: []
    });

    return <PostContext.Provider value={{svosts, setSvosts, addSvost, modifySvost, sort, setSort: setSort, currentPage, setCurrentPage, pageInfo, setPageInfo, isSearching, setIsSearching}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;