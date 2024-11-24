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
const SignUp = ({ setState }: SignInProps) => {
    // states 
    const [loading, setLoading] = useState(false)

    const [loadingProvider, setLoadingProvider] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<{
        name?: string;
        confirmPassword?: string;
        email: string;
        password: string;
    }>({
        name: '',
        confirmPassword: '',
        email: '',
        password: '',
    });

    const { signIn } = useAuthActions();

    // functions 


    const handleProviderSignIn = async (provider: 'google' | 'github') => {

        try {

            setLoadingProvider(true)

            await signIn(provider)


        } catch (error) {
            alert("something want wrong ")
        }

        finally {

            setLoadingProvider(true)
        }



    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(null)

        setLoading(true)

        const { name, confirmPassword, email, password } = formData

        if (password !== confirmPassword) {
            console.log("condition true")
            setError("password don't match")
            setLoading(false)
            return
        }

        signIn("password",
            {
                name: name || "",
                email: email || "",
                password: password || "",
                flow: "signUp",
            }
        ).catch(() => {
            setError("Invalid Email or Password ")
        }).finally(
            () => {
                setLoading(false)
            }
        )


        console.log(formData)
    }

    // start rendering 

    return (
        <Card className='  bg-[#eee] max-sm:w-[100vw] flex items-start flex-col flex-wrap p-2'>
            <CardHeader>

                <CardTitle className=' text-primary  text-xl'>
                    <div className="flex justify-between items-center">
                        <p>
                            Sign In To Continue
                        </p>
                        <CiLogin
                            className=' text-2xl text-primary'
                        />


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


            <CardContent className='w-[450px]  max-sm:w-[100vw]'>
                <form
                    onSubmit={handleSubmit}
                    className=' flex flex-col focus-within:w-full '>

                    <FormInput
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        inputValue={formData.name || ""}
                        fieldKey="name"
                        type="name"
                        placeholder="Ex:Mohamed Mostafa "
                    />
                    <FormInput
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        inputValue={formData.email}
                        fieldKey="email"
                        type="email"
                        placeholder="Ex:moh123@gmail.com"
                    />
                    <FormInput
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        inputValue={formData.password}
                        fieldKey="password"
                        type="password"
                        placeholder="123456"
                    />
                    <FormInput
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        fieldKey="confirmPassword"
                        inputValue={formData.confirmPassword || ""}
                        type="password"
                        placeholder="EX:123456"
                    />



                    {
                        loading ? <p className='text-center'>signing in ...</p> :
                            <Button disabled={loading} type='submit'
                                className={` ${loading ? "bg-none shadow-none " : ""} my-2`}
                            >
                                Sign up
                            </Button>
                    }

                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <>

                    <ProviderButton
                        type="google"
                        loadingState={loadingProvider}
                        handleProviderSignIn={handleProviderSignIn}
                    />

                    <ProviderButton
                        type="github"
                        loadingState={loadingProvider}
                        handleProviderSignIn={handleProviderSignIn}
                    />

                </>
                {/* end    continue with (google and github ) */}

                <p className='mt-2'>Don't have an account ? <span className='cursor-pointer hover:underline text-sky-700'
                    onClick={() => setState("signIn")}
                >sing in</span>
                </p>

            </CardContent>
        </Card>
    )
}

export default SignUp