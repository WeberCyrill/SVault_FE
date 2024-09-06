import '../App.css'
import PostButton from "./PostButton.tsx";
import PostProvider from "../Context/PostContext.tsx";
import Sort from "./Sort.tsx";
import Search from "./Search.tsx";
import SvostList from "./SvostList.tsx";
import PaginationBar from "./PaginationBar.tsx";

function Homepage() {

    return (
        <PostProvider>
            <div className="flex flex-row gap-2 sticky justify-center top-5 z-20 pb-8 w-full">
                <Search/>
                <Sort/>
            </div>
            <SvostList/>
            <PaginationBar/>
            <PostButton/>
        </PostProvider>

    )
}

export default Homepage;
