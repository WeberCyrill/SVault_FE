import {useContext, useEffect, useState} from "react";
import {getPaginatedSvosts} from "../services/SvostService.ts";
import {PostContext, svostsPerPage} from "../Context/PostContext.tsx";
import {Skeleton} from "@nextui-org/react";
import Svost from "./Svost.tsx";

function SvostList() {

    const {
        svosts,
        setSvosts,
        sort,
        currentPage,
        setPageInfo,
        search,
        searchTerm
    } = useContext(PostContext);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(false);
        if (searchTerm === null || searchTerm === "" || searchTerm === undefined ) {
            getPaginatedSvosts(currentPage - 1, svostsPerPage, sort).then((value) => {
                setSvosts(value.data.content);
                setPageInfo(value.data)
                setIsLoaded(true);
            })
        } else {
            search(searchTerm, currentPage - 1)
            setIsLoaded(true);
        }
    }, [currentPage, sort]);

    return (
        <>
            {
                isLoaded ? (
                    <div className="flex flex-col gap-9 justify-center w-full ">
                        {svosts.map((svost) => (<Svost key={svost.id} {...svost} />))}
                    </div>
                ) : (
                    <div className="grid gap-9 justify-center">
                        {Array.from({length: svostsPerPage}).map((_, index) => (
                            <Skeleton key={index} isLoaded={false} className="w-[75vw] h-44 rounded-xl"/>
                        ))}
                    </div>
                )
            }
        </>

    )
}

export default SvostList;