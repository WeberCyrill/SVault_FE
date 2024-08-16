import '../App.css'
import {getAllSvosts, SvostResponse} from "../services/SvostService.ts";
import {useEffect, useState} from "react";
import Svost from "./Svost.tsx";

function SvostOverview() {

    const [svosts, setSvosts] = useState<SvostResponse[]>([]);

    useEffect(() => {
        getAllSvosts()
            .then((value) => {
                setSvosts(value.data);
            })
    }, []);

    return (
        <div className="grid gap-9 justify-center ">
            {svosts.map((svost) => (<Svost key={svost.id} {...svost} />))}
        </div>
    )
}

export default SvostOverview;
