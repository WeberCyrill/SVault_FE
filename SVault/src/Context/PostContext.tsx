import {createContext, useState} from "react";
import {SvostResponse} from "../services/SvostService.ts";

export type PostContextState = {
    svosts: SvostResponse[];
    addSvost: (value: SvostResponse) => void;
    addSvosts: (value: SvostResponse[]) => void;
    modifySvost: (value: SvostResponse) => void;
};

const contextDefaultValues: PostContextState = {
    svosts: [],
    addSvosts: () => {
    },
    addSvost: () => {
    },
    modifySvost: () => {
    },
};

export const PostContext =
    createContext<PostContextState>(contextDefaultValues);

const PostProvider = ({children}) => {

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);
    const addSvost = (value: SvostResponse) => (setSvosts([...svosts, {...value, liked: false}]));
    const addSvosts = (value: SvostResponse[]) => (setSvosts(value));
    const modifySvost = (value: SvostResponse) => {
        const newSvosts: SvostResponse[] = svosts;
        const targetSvost = svosts.findIndex((svostData) => (value.id === svostData.id))
        newSvosts[targetSvost] = value;
        setSvosts([...newSvosts]);
    };

    return <PostContext.Provider value={{svosts, addSvosts, addSvost, modifySvost}}>
        {children}
    </PostContext.Provider>
}

export default PostProvider;