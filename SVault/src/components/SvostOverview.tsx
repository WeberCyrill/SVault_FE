import '../App.css'
import {getPaginatedSvosts, PageResponse, SvostResponse} from "../services/SvostService.ts";
import {useContext, useEffect, useState} from "react";
import Svost from "./Svost.tsx";
import PostButton from "./PostButton.tsx";
import {PostContext} from "../Context/PostContext.tsx";
import Sort from "./Sort.tsx";
import {Pagination} from "@nextui-org/react";

function SvostOverview() {

    const {svosts, setSvosts, sort} = useContext(PostContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState<PageResponse<SvostResponse>>({
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 0,
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: true
        },
        size: 0,
        content: []
    });

    useEffect(() => {
        getPaginatedSvosts(currentPage - 1, 10, sort).then((value) => {
            setSvosts(value.data.content);
            setPageInfo(value.data)
        })
    }, [currentPage, sort]);

    return (
        <>
            <Sort/>

            <div className="grid gap-9 justify-center ">
                {svosts.map((svost) => (<Svost key={svost.id} {...svost} />))}
            </div>
            <div className="flex flex-col items-center pt-5">

                <Pagination
                    showControls
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
