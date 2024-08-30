import '../App.css'
import {Button, Card, CardBody, CardHeader, Divider, Image} from "@nextui-org/react";
import {addNewLike, removeLike, SvostResponse} from "../services/SvostService.ts";
import {useContext} from "react";
import {PostContext} from "../Context/PostContext.tsx";

function Svost(svostData: SvostResponse) {

    const {modifySvost} = useContext(PostContext);

    const toggleLike = () => {
        if(svostData.liked) {
            removeLike(svostData.id)
            modifySvost({...svostData, liked: false, postlike: svostData.postlike - 1})
        }else{
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
                <Button isIconOnly variant="shadow" aria-label="like" className=" flex !gap-1 rounded-full w-12 text-black" color={ svostData.liked ? "danger" : "default"} onClick={toggleLike}>
                    {svostData.postlike}
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 496 512"
                         className="w-5 h-5 ">
                        <path
                            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"/>
                    </svg>
                </Button>
            </div>
        </Card>


    )
}

export default Svost;
