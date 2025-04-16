import { Input } from '@/components/ui/input'
import { useCreateChannelModal } from '../store/use-create-channel-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { useCreateChannels } from '../api/use-create-channel'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateChannelModal = () => {
    // add control state for dialog 
    const [open, setOpen] = useCreateChannelModal()
    const [name, setName] = useState('')

    const router = useRouter()
    const workspaceId = useGetWorkspaceId()
    const { mutate, isPending } = useCreateChannels()


    // funcs 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, '-')
        setName(value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        mutate({ name, workspaceId }, {
            onSuccess: (id) => {
                // redirect to the new channel
                router.push(`/workspaces/${workspaceId}/channel/${id}`)
                handleClose()
            },
            onError: (error) => {
                toast.error("something went wrong")
            }
        })
    }

    const handleClose = () => {

        setName("")

        setOpen(false)
    }

    const handleCreate = () => {

    }


    return (
        <Dialog open={open} onOpenChange={handleClose}>

            {/*start  dialog content  */}
            <DialogContent>

                {/* start dialog header  */}
                <DialogHeader>
                    <DialogTitle>add channel</DialogTitle>
                </DialogHeader>
                {/* end  dialog header  */}

                {/* start body  */}
                <form onSubmit={handleSubmit}>
                    <Input
                        value={name}
                        onChange={handleChange}
                        placeholder="e.g. channel-name"
                        autoFocus
                        required
                        minLength={8}
                        maxLength={12}
                    />
                    <div className=" flex justify-end">

                        <Button
                            variant={null}
                            disabled={isPending}
                            className=' mt-2 bg-secondaryColor text-white hover:bg-secondaryColor/80 transition duration-300'
                        >
                            create
                        </Button>
                    </div>

                </form>
                {/* end body  */}
            </DialogContent>
            {/*end   dialog content  */}


        </Dialog>
    )
}

export default CreateChannelModal