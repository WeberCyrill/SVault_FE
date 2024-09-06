import {createContext, useState} from "react";
import {getPaginatedSvosts, PageResponse, SvostResponse} from "../services/SvostService.ts";

export const svostsPerPage: number = 10;

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
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    search: (value: string, offset:number) => void;
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
    searchTerm: "",
    setSearchTerm: () => {},
    search: () => {}

};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const search = (value: string, offset: number) => {
        if (value == "" || value == null) {
            getPaginatedSvosts(offset, svostsPerPage, sort).then((value) => {
                setSvosts(value.data.content);
                setPageInfo(value.data)
                setIsSearching(false);
            })
        } else {
            setIsSearching(true);
            getPaginatedSvosts(offset, svostsPerPage, sort, value).then((value) => {
                setSvosts(value.data.content);
                setPageInfo(value.data)
            });
        }
    }

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);

    const addSvost = (value: SvostResponse) => (setSvosts([...svosts, {...value, liked: false}]));
    const modifySvost = (value: SvostResponse) => {
        const newSvosts: SvostResponse[] = svosts;
        const targetIndex = svosts.findIndex((svostData) => (value.id === svostData.id))
        newSvosts[targetIndex] = value;
        setSvosts([...newSvosts]);
    };

    const [searchTerm, setSearchTerm] = useState("");
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

    return <PostContext.Provider value={{svosts, setSvosts, addSvost, modifySvost, sort, setSort: setSort, currentPage, setCurrentPage, pageInfo, setPageInfo, isSearching, setIsSearching, searchTerm, setSearchTerm, search}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;