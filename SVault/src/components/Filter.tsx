import '../App.css'
import {SvostResponse} from "../services/SvostService.ts";
import {useContext, useEffect, useMemo, useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {PostContext} from "../Context/PostContext.tsx";

function Filter() {

    const {svosts, addSvosts} = useContext(PostContext);

    const filterSvosts = (): void => {
        const filterdSvosts = [...svosts];
        switch (selectedValue) {

            case "likes":
                addSvosts(filterdSvosts.sort((svost1: SvostResponse, svost2: SvostResponse) => svost2.postlike - svost1.postlike))
                break;
            case "oldest":
                addSvosts(filterdSvosts.sort((svost1: SvostResponse, svost2: SvostResponse) => new Date(svost1.creationdate).getTime() - new Date(svost2.creationdate).getTime()))
                break;
            case "newest":
                addSvosts(filterdSvosts.sort((svost1: SvostResponse, svost2: SvostResponse) => new Date(svost2.creationdate).getTime() - new Date(svost1.creationdate).getTime()))
                break;
        }
    }

    const [selectedKeys, setSelectedKeys] = useState(new Set(["Filter"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    useEffect(() => {
        filterSvosts();
    }, [selectedKeys]);


    return (
        <div className="relative z-20">
            <div className="fixed top-10 right-10">
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="capitalize">
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Filter Dropdown"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={(value) => setSelectedKeys(value)}>
                        <DropdownItem key="likes">Likes</DropdownItem>
                        <DropdownItem key="newest">Newest</DropdownItem>
                        <DropdownItem key="oldest">Oldest</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Filter;
