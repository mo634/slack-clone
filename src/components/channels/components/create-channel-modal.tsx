import { useCreateChannelModal } from '../store/use-create-channel-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const CreateChannelModal = () => {
    // add control state for dialog 
    const [open, setOpen] = useCreateChannelModal()
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            {/*start  dialog content  */}
            <DialogContent>

                {/* start dialog header  */}
                <DialogHeader>
                    <DialogTitle>add channel</DialogTitle>
                </DialogHeader>
                {/* end  dialog header  */}


            </DialogContent>
            {/*end   dialog content  */}


        </Dialog>
    )
}

export default CreateChannelModal