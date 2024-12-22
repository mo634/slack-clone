import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Doc } from "../../../../../convex/_generated/dataModel"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
interface WorkSpaceLeftSideHeaderProps {
    Data: Doc<"workSpaces">
}

const WorkSpaceLeftSideHeader = ({ Data }: WorkSpaceLeftSideHeaderProps) => {
    return (
        <div className="">
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

                    <DropdownMenuSeparator />

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default WorkSpaceLeftSideHeader