import '../App.css'
import {Button, Card, CardBody, CardHeader, Divider, Image} from "@nextui-org/react";
import {addNewLike, removeLike, SvostResponse} from "../services/SvostService.ts";
import {useContext} from "react";
import {PostContext} from "../Context/PostContext.tsx";
import {RoundedLike} from "../assets/svg/RoundedLike.tsx";

function Svost(svostData: SvostResponse) {

    const {modifySvost} = useContext(PostContext);

    const toggleLike = () => {
        if (svostData.liked) {
            removeLike(svostData.id)
            modifySvost({...svostData, liked: false, postlike: svostData.postlike - 1})
        } else {
            addNewLike(svostData.id)
            modifySvost({...svostData, liked: true, postlike: svostData.postlike + 1})
        }

    }

    return (
        <Card className="max-w-[90vw] min-w-[75vw]">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={25}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={30}
                />
                <div className="flex flex-col">
                    <p className="text-ml">{svostData.peasant.name}</p>
                </div>
                <div className="flex justify-end w-full">
                    <p className="text-sm">{new Date(svostData.creationdate).toDateString()}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="text-ml pl-3">{svostData.content}</div>
            </CardBody>
            <div className="flex justify-end w-full pr-4 pb-2">
                <Button isIconOnly variant="shadow" aria-label="like"
                        className=" flex !gap-1 rounded-full w-12 text-black"
                        color={svostData.liked ? "danger" : "default"} onClick={toggleLike}>
                    {svostData.postlike}
                    <RoundedLike className = "w-5 h-5 "/>
                </Button>
            </div>
        </Card>


    )
}

export default Svost;
