"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
import { Separator } from '../ui/separator';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { registerFlow } from './types';

interface SignInProps {
    setState: (state: registerFlow) => void
}
const SignIn = ({ setState }: SignInProps) => {
    // states 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

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


            <CardContent className='w-[450px]'>
                <form className=' flex flex-col focus-within:w-full '>


                    <div className="input-focus-effect ">
                        <input
                            value={formData.email}
                            type="email"
                            className="input-style"
                            placeholder="Ex:moh123@gmail.com"
                            disabled={false}
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
                            disabled={false}
                            required
                            onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                        />
                    </div>
                    <Button disabled={false} onClick={handleSubmit}>


                        Clicke me
                    </Button>
                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        variant="outline"
                        className='relative'
                        size={"lg"}
                    >
                        <FcGoogle className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />
                        continue wih google
                    </Button>
                    <Button disabled={false}
                        onClick={() => { }}
                        variant="outline"
                        className='relative'
                        size={"lg"}>
                        <FaGithub className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />

                        continue wih with github</Button>
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