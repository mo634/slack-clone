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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

                <form className='space-y-4'>
                    <Input
                        value={""}
                        placeholder="Workspace Name e.g. My Workspace"
                        onChange={() => { }}
                        required
                        minLength={3}
                    />

                    <div className=" flex justify-end ">
                        <Button> create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateWorkSpacesModal