import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SignUp = () => {
    return (
        <Card className=''>
            <CardHeader>

                <CardTitle>Sign Up</CardTitle>

                <CardDescription>
                    Enter your email and password
                </CardDescription>

            </CardHeader>


            <CardContent>
                <form>
                    <input type="email" />
                    <input type="password" />
                    <button type='submit'> click me </button>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUp