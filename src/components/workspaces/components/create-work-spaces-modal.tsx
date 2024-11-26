"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAtom } from 'jotai'
import { modalOpenAtom } from '../store/modalAtom'
const CreateWorkSpacesModal = () => {

    const [isOpen, setIsOpen] = useAtom(modalOpenAtom)

    console.log("from dialog", isOpen)

    const handleClose = () => {
        setIsOpen(false)

    }



    return (
        <Dialog open onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Workspace</DialogTitle>

                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CreateWorkSpacesModal