"use client"

import React, { useState } from 'react'
import { registerFlow } from './types'
import SignIn from './sign-in-card'
import SignUp from './sign-up-card'

const AuthScreen = () => {
    const [state, setState] = useState<registerFlow>("signIn")
    return (
        <section className='h-full flex items-center justify-center  bg-mainColor '>
            {
                state === "signIn" ? <SignIn />
                    : <SignUp />
            }
        </section>
    )
}

export default AuthScreen