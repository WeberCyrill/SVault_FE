import {createContext, useState} from "react";
import {SvostResponse} from "../services/SvostService.ts";

export type PostContextState = {
    svosts: SvostResponse[];
    addSvost: (value: SvostResponse) => void;
    setSvosts: (value: SvostResponse[]) => void;
    modifySvost: (value: SvostResponse) => void;
    sort: string;
    setSort: (filter: string) => void;
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
    setSort: () => {},
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


    const [sort, setSort] = useState<string>("");

    return <PostContext.Provider value={{svosts, setSvosts, addSvost, modifySvost, sort, setSort: setSort}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;