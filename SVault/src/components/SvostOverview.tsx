import '../App.css'
import {getAllSvosts, SvostResponse} from "../services/SvostService.ts";
import {useEffect, useState} from "react";
import Svost from "./Svost.tsx";
import PostButton from "./PostButton.tsx";

function SvostOverview() {

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);


    useEffect(() => {
        getAllSvosts()
            .then((value) => {
                setSvosts(value.data);
            })
    }, []);
   const saveSearchResult = (value: SvostResponse) => {
        setSvosts([...svosts, value ])
    }

    return (
        <>
        <div className="grid gap-9 justify-center ">
            {svosts.map((svost) => (<Svost key={svost.id} {...svost} />))}
        </div>
            <PostButton sendSearchResult={saveSearchResult}/>
            </>
    )
}

export default SvostOverview;
