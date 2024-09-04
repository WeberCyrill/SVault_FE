import '../App.css'
import {useContext, useEffect, useMemo, useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {PostContext} from "../Context/PostContext.tsx";

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
        <div className="relative z-20">
            <div className="fixed top-10 right-10">
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="capitalize">
                            Sort
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
        </div>
    )
}

export default Sort;
