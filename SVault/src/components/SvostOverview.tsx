import '../App.css'
import {getPaginatedSvosts} from "../services/SvostService.ts";
import {useContext, useEffect, useState} from "react";
import Svost from "./Svost.tsx";
import PostButton from "./PostButton.tsx";
import {PostContext} from "../Context/PostContext.tsx";
import Sort from "./Sort.tsx";
import {Input, Pagination, Skeleton} from "@nextui-org/react";
import {SearchIcon} from "../assets/svg/SearchIcon.tsx";

export const svostsPerPage: number = 10;


function SvostOverview() {


    const {svosts, setSvosts, sort, currentPage, setCurrentPage, setPageInfo, pageInfo, isSearching, setIsSearching} = useContext(PostContext);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    useEffect(() => {
        setIsLoaded(false);
        if(isSearching){
            search(searchTerm, currentPage -1)
            setIsLoaded(true);
        }else{
            getPaginatedSvosts(currentPage - 1, svostsPerPage, sort).then((value) => {
                console.log(value.data);
                setSvosts(value.data.content);
                setPageInfo(value.data)
                setIsLoaded(true);
            })
        }
    }, [currentPage, sort]);

    const [searchTerm, setSearchTerm] = useState("");

    const search = (value: string, offset: number) => {
        if (value === "") {
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




    return (
        <>
            <Sort/>
            <Input
                className="pb-10 sticky top-5 z-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        search(searchTerm, 0);
                }}
                endContent={<SearchIcon/>}
            />

            {isLoaded ? (
                <div className="grid gap-9 justify-center ">
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
            <div className="flex flex-col items-center pt-5 sticky bottom-5 z-50">

                <Pagination
                    showControls
                    isCompact
                    size="lg"
                    total={pageInfo.totalPages}
                    color="primary"
                    page={currentPage}
                    onChange={setCurrentPage}
                />
            </div>

            <PostButton/>
        </>
    )
}

export default SvostOverview;
