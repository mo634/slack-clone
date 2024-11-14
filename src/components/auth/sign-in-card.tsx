"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
import { Separator } from '../ui/separator';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { registerFlow } from './types';
import { useAuthActions } from "@convex-dev/auth/react";
import Loader from "../Loader.jsx"
interface SignInProps {
    setState: (state: registerFlow) => void
}
const SignIn = ({ setState }: SignInProps) => {
    // states 

    const [isSignInLoading, setIsSignInLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isGithubLoading, setIsGithubLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useAuthActions();
    const handleProviderSignIn = async (provider: 'google' | 'github') => {

        try {

            setIsLoading(true)

            provider === 'google' ? setIsGoogleLoading(true) : setIsGithubLoading(true);

            await signIn(provider)


        } catch (error) {
            alert("something want wrong ")
        }

        finally {

            // Reset the loading state for the clicked button
            provider === 'google' ? setIsGoogleLoading(false) : setIsGithubLoading(false);
            setIsLoading(false)
        }



    }

    // functions 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }

    // start rendering 

    return (
        <Card className=' bg-[#eee]'>
            <CardHeader>

                <CardTitle className=' text-primary  text-xl'>
                    <div className="flex justify-between items-center">
                        <p>
                            Sign In To Continue ss
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


            <CardContent className='w-[450px]'>
                <form className=' flex flex-col focus-within:w-full '>


                    <div className="input-focus-effect ">
                        <input
                            value={formData.email}
                            type="email"
                            className="input-style"
                            placeholder="Ex:moh123@gmail.com"
                            disabled={isLoading}
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
                            disabled={isLoading}
                            required
                            onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                        />
                    </div>
                    <Button disabled={isLoading} onClick={handleSubmit}
                        className={` ${isSignInLoading ? "bg-transparent shadow-none " : ""} my-2`}
                    >
                        {
                            isSignInLoading ? <Loader /> : "Sign In"
                        }
                    </Button>
                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={isLoading}
                        onClick={() => handleProviderSignIn("google")}
                        variant="outline"
                        className={`relative my-2 ${isLoading ? "bg-transparent" : ""}`}
                        size={"lg"}
                    >
                        {
                            isGoogleLoading ? <Loader />

                                :
                                <>
                                    <FcGoogle className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />
                                    continue wih google
                                </>


                        }
                    </Button>
                    <Button disabled={isLoading}
                        onClick={() => handleProviderSignIn("github")}
                        variant="outline"
                        className={`relative my-2 ${isLoading ? "bg-transparent" : ""}`}
                        size={"lg"}>

                        {
                            isGithubLoading ? <Loader />
                                :
                                <>
                                    <FaGithub className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />
                                    continue wih github
                                </>
                        }

                    </Button>
                </div>
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