import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCreateNewJoinCode } from '@/components/workspaces/api/use-create-new-join-code'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { useConfirm } from '@/hooks/use-confirm'
import { CheckIcon, CopyIcon } from 'lucide-react'
import React, { use, useState } from 'react'
import { toast } from 'sonner'

interface InviteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    name: string
    joinCode: string
}
const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {

    const workspaceId = useGetWorkspaceId()

    const [ConfirmDialogUI, confirm] = useConfirm(
        "Are You Sure ",
        "Are you sure you want to generate a new invite code?"
    )

    const { mutate, isPending } = useCreateNewJoinCode()

    const [isCopy, setIsCopy] = useState(false)

    // funcs
    const handleCopy = () => {

        setIsCopy(true)

        const inviteLink = `${window.location.origin}/join/${workspaceId}`

        navigator.clipboard.writeText(inviteLink).then(() => {
            toast.success("copied to clipboard")
        })

        setTimeout(() => {
            setIsCopy(false)
        }, 3000)

    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleGenerateNewCode = async () => {

        const ok = await confirm()
        if (!ok) return
        mutate({ workspaceId }, {
            onSuccess: () => {
                toast.success("new code generated")
            },
            onError: () => {
                toast.error("error generating new code")
            }
        })
    }

    console.log(open)
    return (
        <>
            <ConfirmDialogUI />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>Invite People</DialogTrigger>

                {/*start  dialog content  */}

                <DialogContent>

                    {/* start dialog header  */}

                    <DialogHeader>

                        <DialogTitle>Invite people to {name}</DialogTitle>

                        <DialogDescription>Copy the code below and send it to the person you want to invite</DialogDescription>

                    </DialogHeader>
                    {/* start display join code  */}
                    <div className="flex items-center justify-center font-bold text-5xl uppercase">
                        <span>{joinCode}</span>
                        <Button
                            variant={null}
                            onClick={handleCopy}
                        >
                            {
                                isCopy ? <CheckIcon className=' text-green-600' /> : <CopyIcon />

                            }
                        </Button>
                    </div>
                    {/* end display join code  */}

                    {/* start display generate new code  */}
                    <div className="flex items-center justify-between">
                        <Button variant={'outline'}
                            onClick={handleGenerateNewCode}
                        >
                            Generate new code
                        </Button>

                        <Button onClick={handleCloseModal}>
                            Close
                        </Button>

                    </div>
                    {/* end  display generate new code  */}



                    {/* end  dialog header  */}
                </DialogContent>

                {/*end   dialog content  */}
            </Dialog>
        </>
    )
}

export default InviteModal