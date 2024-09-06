
import {PostContext} from "../Context/PostContext.tsx";
import {useContext} from "react";
import {Pagination} from "@nextui-org/react";

function PaginationBar() {

    const {
        currentPage,
        setCurrentPage,
        pageInfo,
    } = useContext(PostContext);

    return (
        <div className="flex flex-col items-center pt-5 sticky bottom-5 z-20">

            <Pagination
                className="md:block hidden"
                showControls
                isCompact
                size="lg"
                total={pageInfo.totalPages}
                color="primary"
                page={currentPage}
                onChange={setCurrentPage}
                siblings={3}
            />
            <Pagination
                className="md:hidden block"
                showControls
                isCompact
                size="md"
                total={pageInfo.totalPages}
                color="primary"
                page={currentPage}
                onChange={setCurrentPage}
            />
        </div>
    )
}

export default PaginationBar;
