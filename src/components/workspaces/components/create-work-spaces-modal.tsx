"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useAtom } from 'jotai'
import { modalOpenAtom } from '../store/modalAtom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateWorkSpace } from '../api/use-create-work-space'
import { useRouter } from 'next/navigation'
const CreateWorkSpacesModal = () => {
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [isOpen, setIsOpen] = useAtom(modalOpenAtom)

    const { mutate } = useCreateWorkSpace()

    const handleClose = () => {
        setIsOpen(false)

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await mutate(
                {
                    name
                },
                {
                    onSuccess: (data) => {
                        console.log(data)
                        toast.success("workspace created successfully", { duration: 3000 })
                    },
                    onError: (error) => {

                    }
                }
            )
        } catch (error) {

        }
    }



    return (
        <Dialog open onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Workspace</DialogTitle>

                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <Input
                        value={name}
                        placeholder="Workspace Name e.g. My Workspace"
                        onChange={(e) => setName(e.target.value)}
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