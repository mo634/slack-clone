import { Button } from '@/components/ui/button'
import { PlaneIcon, PlusCircleIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Hint from './Hint'
import { useToggle } from 'react-use'
import { cn } from '@/lib/utils'
interface workspaceSectionProps {
    children: React.ReactNode,
    label: string,
    hint: string,
    onNew?: () => void
}
const WorkspaceSection = ({
    children,
    label,
    hint,
    onNew
}: workspaceSectionProps) => {

    const [on, toggle] = useToggle(false)


    return (
        <div>

            <Button
                variant={null}
                className='group mt-2 w-full flex justify-between items-center bg-white hover:opacity-60 transition duration-500'
                onClick={toggle}
            >

                <div className=" flex items-center">

                    <FaCaretDown
                        className={cn("mr-2 -rotate-90", on && "rotate-0")}
                    />
                    <span>{label}</span>

                </div>


                {
                    onNew && (
                        <Hint
                            side="top"
                            align="center"
                            label={hint}
                        >
                            <Button
                                asChild
                                variant={null}
                                onClick={onNew}
                                size={"icon"}
                                className='size-6 opacity-0 group-hover:opacity-100 transition duration-500'
                            >
                                <PlusIcon />
                            </Button>
                        </Hint>
                    )
                }

            </Button>



            {
                on && (
                    children
                )
            }


        </div>
    )
}

export default WorkspaceSection