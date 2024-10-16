import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
const SignIn = () => {
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

                    <p>
                        Enter your email and password
                    </p>

                </CardDescription>

            </CardHeader>


            <CardContent className='w-[450px]'>
                <form className=' flex flex-col focus-within:w-full '>


                    <div className="input-focus-effect ">
                        <input
                            value={''}
                            type="email"
                            className="input-style"
                            placeholder="Ex:moh123@gmail.com"
                            disabled={false}
                            required
                            onChange={() => { }}
                        />

                    </div>


                    <div className="input-focus-effect">
                        <input
                            value={''}
                            type="password"
                            className="input-style"
                            placeholder="EX:123456"
                            disabled={false}
                            required
                            onChange={() => { }}
                        />
                    </div>
                    <Button>
                        Clicke me
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignIn