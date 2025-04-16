import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { TrashIcon } from '@radix-ui/react-icons'
import { TorusIcon, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useTitle } from 'react-use'

interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => {

    const [clickEdit, setClickEdit] = useState(false)
    const [value, setValue] = useState(title)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, '-')
        setValue(value)
    }
    return (
        <div>

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

                        <Dialog open={clickEdit} onOpenChange={setClickEdit}>

                            <DialogTrigger asChild>
                                <span
                                    className=' text-sm text-[#1264a3] cursor-pointer hover:opacity-60 transition duration-500'>

                                    Edit

                                </span>

                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>

                                    <DialogTitle className=''>
                                        Edit Channel Name
                                    </DialogTitle>

                                </DialogHeader>
                                <form>
                                    <Input
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='e.g. new-channel-name'
                                        maxLength={20}
                                        minLength={3}
                                        disabled={false}
                                        autoFocus
                                        required
                                    />
                                </form>

                                <DialogFooter>

                                    <DialogClose asChild>
                                        <Button>
                                            Close
                                        </Button>
                                    </DialogClose>

                                    <Button variant={'outline'}>
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>

                        </Dialog>

                    </div>

                    <Button
                        variant={null}
                        className=' flex w-fit font-bold text-rose-600 hover:text-rose-400 duration-500'>

                        <TrashIcon className=' size-6' />
                        <p>Delete Channel</p>

                    </Button>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default Header