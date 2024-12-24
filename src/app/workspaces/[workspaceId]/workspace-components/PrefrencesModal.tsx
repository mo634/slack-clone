import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useRemoveWorkSpace } from "@/components/workspaces/api/use-remove-work-space"
import { useUpdateWorkSpace } from "@/components/workspaces/api/use-update-workspace"
import { useGetWorkspaceId } from "@/components/workspaces/hooks/use-get-workspace-id"
import { DoorClosed, TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
interface PrefrencesModalProps {
    isopen: boolean
    setIsOpen: (isopen: boolean) => void
    initialValue: string
}
const PrefrencesModal = ({
    isopen,
    setIsOpen,
    initialValue
}: PrefrencesModalProps) => {

    const [value, setValue] = useState(initialValue)

    const workspaceId = useGetWorkspaceId()

    const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkSpace()
    const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } = useRemoveWorkSpace()

    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateWorkspace({
            id: workspaceId,
            name: value
        }, {
            onSuccess: () => {
                setIsEdit(false)
                toast.success("workspace updated")
            },
            onError: () => {
                toast.error("error updating workspace")
            }
        })
    }

    return (
        <Dialog open={isopen} onOpenChange={setIsOpen}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{value}</DialogTitle>
                </DialogHeader>
                {/* start nestead dialog */}

                <Dialog open={isEdit} onOpenChange={setIsEdit}>
                    <DialogTrigger>
                        <div className=" ">

                            <div className="flex  flex-col gap-2">

                                <div className="flex items-center justify-between ">

                                    <span className="font-bold text-xl">workspace name </span>

                                    <button className="bg-blue-700 rounded-md px-2 py-1 hover:bg-blue-800 duration-500">
                                        <span className="text-white">Edit</span>
                                    </button>
                                </div>

                                <span className="font-semibold w-fit ">{value} </span>

                            </div>


                        </div>
                    </DialogTrigger>
                    <DialogContent>


                        <DialogHeader>
                            <DialogTitle>Rename</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="">
                            <Input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required
                                minLength={3}
                                autoFocus
                                disabled={isUpdatingWorkspace}
                                placeholder="workspace name e.g 'Work' , 'Personal'"
                                className="mb-2"
                            />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        variant={'outline'}
                                    >Cancel</Button>
                                </DialogClose>

                                <Button
                                    disabled={isUpdatingWorkspace}
                                >Save </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>


                </Dialog>

                {/* end nested dialog */}

                <Separator />
                <div className=" flex items-center gap-2">
                    <button
                        className="bg-red-600 rounded-md px-2 py-1 hover:bg-red-700 duration-500 w-fit"
                        disabled={false}
                        onClick={() => { }}
                    >
                        <TrashIcon className="text-white" />
                    </button>
                    <span className="text-red-700">Delete Workspace</span>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PrefrencesModal