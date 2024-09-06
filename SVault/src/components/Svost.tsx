import '../App.css'
import {Avatar, Button, Card, CardBody, CardHeader, Divider, User} from "@nextui-org/react";
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
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                <User
                    name={svostData.peasant.name}
                    description={svostData.peasant.email}
                    avatarProps={{
                        src: svostData.peasant.profilepicture,
                        radius: "md",
                        showFallback: true,
                }}/>
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
                        className="flex !gap-1 rounded-full w-12 text-black"
                        color={svostData.liked ? "danger" : "default"} onClick={toggleLike}>
                    {svostData.postlike}
                    <RoundedLike className="w-5 h-5"/>
                </Button>
            </div>
        </Card>


    )
}

export default Svost;
