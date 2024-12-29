import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"

export const useConfirm = (
    title: string,
    message: string
): [any, any] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })
    const handleClose = () => {
        setPromise(null)
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const ConfirmDialogUI = () => (
        <Dialog open={promise !== null}>
            <DialogContent>


                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>

                <DialogFooter >

                    <Button onClick={handleCancel} >
                        Cancel
                    </Button>

                    <Button onClick={handleConfirm} >
                        Confirm
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    )

    return [ConfirmDialogUI, confirm]
}