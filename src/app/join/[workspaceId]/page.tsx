"use client"
import { useWorkSpacesInfo } from '@/components/workspaces/api/use-get-work-spaces-info'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import Image from 'next/image'
import React, { useEffect, useMemo } from 'react'
import VerificationInput from 'react-verification-input'
import LoaderComponent from '@/components/ui-components/loader/Loader.jsx'
import { useJoinCode } from '@/components/workspaces/api/use-join-code'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
const Join = () => {
    const router = useRouter()
    const workspaceId = useGetWorkspaceId()

    const { data, isLoading } = useWorkSpacesInfo({ id: workspaceId })

    const { mutate, isPending } = useJoinCode()

    const isMember = useMemo(() => data?.isMember, [data?.isMember])

    useEffect(() => {
        if (isMember) {
            router.push(`/workspaces/${workspaceId}`)
        }
    }, [isMember, router, workspaceId])

    const handleComplete = (value: string) => {
        mutate({ workspaceId, joinCode: value },
            {
                onSuccess: (id) => {
                    router.replace(`/workspaces/${id}`)
                    toast.success('Successfully joined the workspace')
                },
                onError: (error) => {
                    toast.error('Failed to join the workspace')

                }
            })
    }

    if (isLoading) {
        return (
            <>
                <LoaderComponent />
            </>
        )
    }

    console.log(data)
    return (
        <div className=' h-full'>
            <div className=" flex flex-col items-center justify-center h-full gap-y-3">
                {/* image */}

                <Image src='/images/join-icon.png' alt='join workspace' width={80} height={80} />

                <h1 className=' text-2xl'>Join {data?.name}</h1>
                <p className=' text-muted-foreground '>Enter the workspace join code to join</p>


                {/* verification input */}
                <VerificationInput
                    onComplete={handleComplete}
                    classNames={{

                        container: cn('flex justify-center gap-x-2', isPending && 'cursor-not-allowed opacity-50'),
                        character: 'rounded-md border border-gray-300',
                        characterInactive: 'bg-white',
                        characterSelected: 'bg-blue-700 text-white',
                        characterFilled: 'bg-blue-500 text-white'

                    }}
                />
            </div>
        </div>
    )
}

export default Join