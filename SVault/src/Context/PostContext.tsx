import {createContext, FC, useState} from "react";
import {SvostResponse} from "../services/SvostService.ts";

export type PostContextState = {
    svosts: SvostResponse[];
    addSvost: (value: SvostResponse) => void;
    addSvosts: (value: SvostResponse[]) => void;
};

const contextDefaultValues: PostContextState = {
    svosts: [],
    addSvosts: () => {},
    addSvost: () => {},
};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);
    const addSvosts = (value: SvostResponse[]) => (setSvosts(value));
    const addSvost = (value: SvostResponse) => (setSvosts([...svosts, value]));

    return <PostContext.Provider value={{svosts, addSvosts, addSvost}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;