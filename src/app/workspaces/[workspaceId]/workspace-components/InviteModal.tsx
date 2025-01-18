import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>Invite People</DialogTrigger>

            {/*start  dialog content  */}

            <DialogContent>

                {/* start dialog header  */}

                <DialogHeader>

                    <DialogTitle>Invite people to {name}</DialogTitle>

                    <DialogDescription>Copy the code below and send it to the person you want to invite</DialogDescription>

                </DialogHeader>

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


                {/* end  dialog header  */}
            </DialogContent>

            {/*end   dialog content  */}
        </Dialog>
    )
}

export default InviteModal