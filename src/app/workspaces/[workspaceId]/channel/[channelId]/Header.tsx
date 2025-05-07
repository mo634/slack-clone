import { useDeleteChannels } from '@/components/channels/api/use-delete-channel'
import { useUpdateChannels } from '@/components/channels/api/use-update-channel copy'
import { getCurrentMember } from '@/components/members/api/use-get-current-member'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useGetChannelId } from '@/components/workspaces/hooks/use-get-channel-id'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { useConfirm } from '@/hooks/use-confirm'
import { TrashIcon } from '@radix-ui/react-icons'
import { TorusIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { toast } from 'sonner'


interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => {
    const router = useRouter()

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to delete this channel?",
        "This action cannot be undone.",
    )

    const workspaceId = useGetWorkspaceId()

    const channelId = useGetChannelId()

    const [clickEdit, setClickEdit] = useState(false)
    const { data: member } = getCurrentMember({ workspaceId })
    const [value, setValue] = useState(title)

    const { mutate: updateChannel, isPending: isChannelUpdate } = useUpdateChannels()

    const { mutate: deleteChannel, isPending: isChannelDelete } = useDeleteChannels()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, '-')
        setValue(value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateChannel({ channelId, name: value },
            {
                onSuccess: () => {
                    toast.success("channel updated successfully")
                    setClickEdit(false)
                },
                onError: (error) => {
                    console.error('Error updating channel')
                    setClickEdit(false)
                },
            }
        )

    }

    const handleDelete = async () => {

        const ok = await confirm()
        if (!ok) return

        deleteChannel({ channelId }, {
            onSuccess: () => {
                toast.success("channel deleted successfully")
                router.push(`/workspaces/${workspaceId}`)
            },
            onError: (error) => {
                console.error('Error deleting channel')
            },
        })
    }

    const handleisAdmin = (value: boolean) => {
        if (member?.role !== "admin") return
        setClickEdit(value)
    }
    return (
        <div>
            <ConfirmDialog />

            <Dialog>

                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className='mt-2 ml-2  bg-white hover:opacity-60 transition duration-500'
                    >
                        {title}

                        <FaChevronDown className='ml-2' />
                    </Button>

                </DialogTrigger>

                <DialogContent>

                    <DialogHeader>

                        <DialogTitle className=''>
                            {title}
                        </DialogTitle>

                    </DialogHeader>


                    <div className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>

                        <div>
                            <p className=' font-bold text-lg '>channel name </p>

                            <span># {title}</span>
                        </div>

                        <Dialog open={clickEdit} onOpenChange={handleisAdmin}>

                            <DialogTrigger asChild>
                                {
                                    member?.role === "admin" && (
                                        <span
                                            className=' text-sm text-[#1264a3] cursor-pointer hover:opacity-60 transition duration-500'>

                                            Edit

                                        </span>
                                    )
                                }

                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>

                                    <DialogTitle className=''>
                                        Edit Channel Name
                                    </DialogTitle>

                                </DialogHeader>
                                <form onSubmit={handleSubmit} >
                                    <Input
                                        className=' mb-2'
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='e.g. new-channel-name'
                                        maxLength={20}
                                        minLength={3}
                                        disabled={isChannelUpdate}
                                        autoFocus
                                        required
                                    />

                                    <DialogFooter>

                                        <DialogClose asChild>
                                            <Button disabled={isChannelUpdate}>
                                                Close
                                            </Button>
                                        </DialogClose>

                                        <Button variant={'outline'} type='submit' disabled={isChannelUpdate}>
                                            Save
                                        </Button>
                                    </DialogFooter>

                                </form>

                            </DialogContent>

                        </Dialog>

                    </div>

                    {
                        member?.role === "admin" && (
                            <Button
                                variant={null}
                                className=' flex w-fit font-bold text-rose-600 hover:text-rose-400 duration-500'
                                onClick={handleDelete}
                                disabled={isChannelDelete}
                            >

                                <TrashIcon className=' size-6' />
                                <p>Delete Channel</p>

                            </Button>
                        )

                    }
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default Header