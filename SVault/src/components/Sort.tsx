import '../App.css'
import {useContext, useEffect, useMemo, useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {PostContext} from "../Context/PostContext.tsx";
import {FilterIcon} from "../assets/svg/FilterIcon.tsx";

function Sort() {

    const {setSort} = useContext(PostContext);

    const [selectedKeys, setSelectedKeys] = useState(new Set(["creationdate_desc"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    useEffect(() => {
        setSort(selectedValue);
    }, [selectedKeys]);


    return (

        <div className="z-30 items-end content-end justify-end ">
            <Dropdown>
                <DropdownTrigger>
                    <Button className=" min-w-0 data-[hover=true]:opacity-100 aria-expanded:opacity-100">
                        <p className="hidden md:block">Sort</p>
                        <FilterIcon className="h-5 w-5"/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Sort Dropdown"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(value) => setSelectedKeys(value)}>
                    <DropdownItem key="postlike_desc">Most Likes</DropdownItem>
                    <DropdownItem key="postlike_asc">Least Likes</DropdownItem>
                    <DropdownItem key="creationdate_desc">Newest</DropdownItem>
                    <DropdownItem key="creationdate_asc">Oldest</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Sort;
