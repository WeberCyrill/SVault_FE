import {SearchIcon} from "../assets/svg/SearchIcon.tsx";
import {Input} from "@nextui-org/react";
import {useContext} from "react";
import {PostContext} from "../Context/PostContext.tsx";

function Search() {

    const {search, setSearchTerm, searchTerm} = useContext(PostContext);

    return (
        <Input
            className="basis-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter")
                    search(searchTerm, 0);
            }}
            endContent={<SearchIcon/>}
        />
    )
}

export default Search;
