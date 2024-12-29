import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Doc } from "../../../../../convex/_generated/dataModel"
import { ChevronDown, ListFilter, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hint from "./Hint"
import PrefrencesModal from "./PrefrencesModal"
import { useState } from "react"
interface WorkSpaceLeftSideHeaderProps {
    Data: Doc<"workSpaces">
    isAdmin: boolean
}

const WorkSpaceLeftSideHeader = ({ Data, isAdmin }: WorkSpaceLeftSideHeaderProps) => {
    const [isopen, setIsOpen] = useState(false)
    const [isPrefrenceClicked, setIsPrefrenceClicked] = useState(false)
    return (

        <>



            <div className=" flex items-center justify-between">
                <DropdownMenu >
                    <DropdownMenuTrigger
                        asChild
                        className="flex justify-center items-center gap-1 text-lg">
                        <Button>
                            <span>{Data.name}</span>
                            <ChevronDown className="size-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="start" className="w-64">
                        <DropdownMenuLabel
                            className=""
                        >
                            <div className=" ">
                                <div className=" flex items-center gap-2">
                                    <span className=" w-10 h-10 bg-secondaryColor text-white text-2xl rounded-full flex items-center justify-center ">{Data.name.charAt(0).toUpperCase()}</span>
                                    <span className=" text-2xl line-clamp-1">{Data.name}</span>
                                </div>
                                <p className="ml-12 text-muted-foreground line-clamp-1">active work space</p>
                            </div>

                        </DropdownMenuLabel>

                        {
                            isAdmin && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>
                                        invite people  to {Data.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel asChild>


                                        <PrefrencesModal
                                            isopen={isopen}
                                            setIsOpen={setIsOpen}
                                            initialValue={Data.name}
                                        />

                                    </DropdownMenuLabel>
                                </>
                            )
                        }

                    </DropdownMenuContent>

                </DropdownMenu>

                <div className="flex">
                    <Hint label="Filter Conversations" side="bottom" align="center">
                        <Button variant={null} size="icon">
                            <ListFilter />
                        </Button>
                    </Hint>
                    <Hint label="New Message" side="bottom" align="center">
                        <Button variant={null} size="icon">
                            <SquarePen />
                        </Button>

                    </Hint>
                </div>


            </div>
        </>
    )
}

export default WorkSpaceLeftSideHeader