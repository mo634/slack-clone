"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
import { Separator } from '../ui/separator';
import { registerFlow } from './types';
import { useAuthActions } from "@convex-dev/auth/react";
import Loader from "../Loader.jsx"
import ProviderButton from './ProviderButton'

import { TriangleAlert } from "lucide-react"
interface SignInProps {
    setState: (state: registerFlow) => void
}
const SignIn = ({ setState }: SignInProps) => {
    // states 
    const [loadingState, setLoadingState] = useState({
        signIn: false,
        google: false,
        github: false,
        general: false,
    });


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const [error, setError] = useState<string | null>(null)

    const { signIn } = useAuthActions();

    // functions 

    const setLoading = (key: keyof typeof loadingState, value: boolean) => {
        setLoadingState((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    const handleProviderSignIn = async (provider: 'google' | 'github') => {

        try {

            setLoading("general", true)

            provider === 'google' ? setLoading("google", true) : setLoading("github", true);

            await signIn(provider)


        } catch (error) {
            alert("something want wrong ")
        }

        finally {

            // Reset the loading state for the clicked button
            provider === 'google' ? setLoading("google", false) : setLoading("github", false);
            setLoading("general", false)
        }



    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading("signIn", true)
        const { email, password } = formData
        signIn("password",
            { email, password, flow: "signIn" }
        ).catch(() => {
            setError("Invalid Email or Password ")
        }).finally(
            () => {
                setLoading("signIn", false)
            }
        )


        console.log(formData)
    }

    // start rendering 

    return (
        <Card className=' bg-[#eee]'>
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


            <CardContent className='w-[450px]'>
                <form className=' flex flex-col focus-within:w-full '>


                    <div className="input-focus-effect ">
                        <input
                            value={formData.email}
                            type="email"
                            className="input-style"
                            placeholder="Ex:moh123@gmail.com"
                            disabled={loadingState.general}
                            required
                            onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                        />

                    </div>


                    <div className="input-focus-effect">
                        <input
                            value={formData.password}
                            type="password"
                            className="input-style"
                            placeholder="EX:123456"
                            disabled={loadingState.general}
                            required
                            onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                        />
                    </div>

                    {
                        loadingState.signIn ? <p className='text-center'>signing in ...</p> :
                            <Button disabled={loadingState.general} onClick={handleSubmit}
                                className={` ${loadingState.general ? "bg-none shadow-none " : ""} my-2`}
                            >
                                Sign In
                            </Button>
                    }
                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <>

                    <ProviderButton
                        type="google"
                        loadingState={loadingState.google}
                        handleProviderSignIn={handleProviderSignIn}
                    />

                    <ProviderButton
                        type="github"
                        loadingState={loadingState.github}
                        handleProviderSignIn={handleProviderSignIn}
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