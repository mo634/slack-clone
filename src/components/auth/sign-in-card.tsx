"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
import { Separator } from '../ui/separator';
import { registerFlow } from './types';
import { useAuthActions } from "@convex-dev/auth/react";
import ProviderButton from './auth-components/ProviderButton'

import { TriangleAlert } from "lucide-react"
import FormInput from "./auth-components/FormInput"
interface SignInProps {
    setState: (state: registerFlow) => void
}
const SignIn = ({ setState }: SignInProps) => {
    // states 
    const [loading, setLoading] = useState(false)

    const [gitHubLoading, setGithubLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { signIn } = useAuthActions();

    // functions 


    const handleProviderSignIn = async (provider: 'google' | 'github') => {

        try {

            if (provider === "github") {
                setGithubLoading(true)
            } else {
                setGoogleLoading(true)
            }

            await signIn(provider)


        } catch (error) {
            alert("something want wrong ")
        }

        finally {

            setGoogleLoading(false)
            setGithubLoading(false)
        }



    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(null)

        setLoading(true)

        const { email, password } = formData

        signIn("password",
            { email, password, flow: "signIn" }
        ).catch(() => {
            setError("Invalid Email or Password ")
        }).finally(
            () => {
                setLoading(true)
            }
        )


        console.log(formData)
    }

    // start rendering 

    return (
        <Card className=' bg-[#eee] max-sm:w-[100vw] flex items-start flex-col flex-wrap p-2'>
            <CardHeader>

                <CardTitle className=' text-primary  text-xl'>
                    <div className="flex justify-between items-center">
                        <p>
                            Sign In To Continue
                        </p>



                    </div>
                </CardTitle>

                <CardDescription className=' text-primary '>

                    <span>
                        Enter your email and password
                    </span>

                </CardDescription>

            </CardHeader>

            {
                error && (
                    <div className=" flex m-auto text-destructive bg-destructive/15 w-fit items-center gap-2 px-4 py-2 rounded-md mb-2">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )
            }


            <CardContent className='w-[450px] max-sm:w-[100vw]'>
                <form
                    onSubmit={handleSubmit}
                    className=' flex flex-col focus-within:w-full w- n'>

                    <FormInput
                        fieldKey='email'
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        inputValue={formData.email}
                        type="email"
                        placeholder="Ex:moh123@gmail.com"
                    />
                    <FormInput
                        fieldKey='password'
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        inputValue={formData.password}
                        type="password"
                        placeholder="EX:123456"
                    />



                    {
                        loading ? <p className='text-center'>signing in ...</p> :
                            <Button disabled={loading} type='submit'
                                className={` ${loading ? "bg-none shadow-none " : ""} my-2 text-lg`}
                            >
                                <CiLogin
                                    className='mr-4 text-2xl text-white'
                                />
                                Sign In
                            </Button>
                    }

                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <>

                    <ProviderButton
                        type="google"
                        loadingState={googleLoading}
                        handleProviderSignIn={() => handleProviderSignIn("google")}
                    />

                    <ProviderButton
                        type="github"
                        loadingState={gitHubLoading}
                        handleProviderSignIn={() => handleProviderSignIn("github")}
                    />

                </>
                {/* end    continue with (google and github ) */}

                <p className='mt-2'>Don't have an account ? <span className='cursor-pointer hover:underline text-sky-700'
                    onClick={() => setState("signUp")}
                >sing up</span>
                </p>

            </CardContent>
        </Card>
    )
}

export default SignIn