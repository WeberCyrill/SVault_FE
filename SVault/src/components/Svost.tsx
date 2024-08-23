import '../App.css'
import {Card, CardBody, CardHeader, Divider, Image} from "@nextui-org/react";
import {SvostResponse} from "../services/SvostService.ts";

function Svost(svostData: SvostResponse) {

    return (

            <Card className="max-w-[50vw] min-w-[25vw]">
                <CardHeader  className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={25}
                        radius="sm"
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={25}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{svostData.peasant.name}</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div>{svostData.content}</div>
                </CardBody>
            </Card>
    )
}

export default Svost;
