import '../App.css'
import {getAllSvosts} from "../services/SvostService.ts";
import {useContext, useEffect} from "react";
import Svost from "./Svost.tsx";
import PostButton from "./PostButton.tsx";
import {PostContext} from "../Context/PostContext.tsx";
import Filter from "./Filter.tsx";

function SvostOverview() {

    const {svosts, addSvosts} = useContext(PostContext);

    useEffect(() => {
        getAllSvosts().then((value) => {
            addSvosts(value.data);
         })
    }, []);

    return (
        <>
            <Filter/>
            <div className="grid gap-9 justify-center ">
                {svosts.map((svost) => (<Svost key={svost.id} {...svost} />))}
            </div>
            <PostButton/>
        </>
    )
}

export default SvostOverview;
