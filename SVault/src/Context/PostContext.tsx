import {createContext, useState} from "react";
import {SvostProps} from "../components/Svost.tsx";
import {SvostResponse} from "../services/SvostService.ts";

export type PostContextState = {
    svosts: SvostProps[];
    addSvost: (value: SvostResponse) => void;
    addSvosts: (value: SvostProps[]) => void;
};

const contextDefaultValues: PostContextState = {
    svosts: [],
    addSvosts: () => {},
    addSvost: () => {},
};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const [svosts, setSvosts] = useState<SvostProps[]>([]);
    const addSvost = (value: SvostResponse) => (setSvosts([...svosts, {...value, isLiked:false}]));
    const addSvosts = (value: SvostProps[]) => (setSvosts(value));

    return <PostContext.Provider value={{svosts, addSvosts, addSvost}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;