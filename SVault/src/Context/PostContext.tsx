import {createContext, useState} from "react";
import {getPaginatedSvosts, PageResponse, SvostResponse} from "../services/SvostService.ts";

export type PostContextState = {
    svosts: SvostResponse[];
    setSvosts: (value: SvostResponse[]) => void;
    modifySvost: (value: SvostResponse) => void;
    sort: string;
    setSort: (filter: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    search: (value: string, offset: number) => void;
    pageInfo: PageResponse<SvostResponse>;
    setPageInfo: (pageInfo: PageResponse<SvostResponse>) => void;
};

const contextDefaultValues: PostContextState = {
    svosts: [],
    setSvosts: () => {
    },
    modifySvost: () => {
    },
    sort: "",
    setSort: () => {
    },
    currentPage: 1,
    setCurrentPage: () => {
    },
    searchTerm: "",
    setSearchTerm: () => {
    },
    search: () => {
    },
    setPageInfo: () => {
    },
    pageInfo: {
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: {
                sorted: false,
                unsorted: false,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: false
        },
        size: 0,
        content: [],
        number: 0,
        sort: {
            sorted: false,
            unsorted: false,
            empty: true
        },
        numberOfElements: 0,
        first: false,
        last: false,
        empty: true

    },
};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const search = (value: string, offset: number) => {
        if (value == "" || value == null) {
            getPaginatedSvosts(offset, pageInfo.pageable.pageSize, sort).then((value) => {
                setSvosts(value.data.content);
                setPageInfo(value.data)
            })
        } else {
            getPaginatedSvosts(offset, pageInfo.pageable.pageSize, sort, value).then((value) => {
                setSvosts(value.data.content);
                setPageInfo(value.data)
            });
        }
    }

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);
    const modifySvost = (value: SvostResponse) => {
        const newSvosts: SvostResponse[] = svosts;
        const targetIndex = svosts.findIndex((svostData) => (value.id === svostData.id))
        newSvosts[targetIndex] = value;
        setSvosts([...newSvosts]);
    };

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("");

    const [pageInfo, setPageInfo] = useState<PageResponse<SvostResponse>>({
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: {
                sorted: false,
                unsorted: false,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: false
        },
        size: 0,
        content: [],
        number: 0,
        sort: {
            sorted: false,
            unsorted: false,
            empty: true
        },
        numberOfElements: 0,
        first: false,
        last: false,
        empty: true

    });

    return <PostContext.Provider value={{
        svosts,
        setSvosts,
        modifySvost,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        pageInfo,
        setPageInfo,
        searchTerm,
        setSearchTerm,
        search
    }}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;