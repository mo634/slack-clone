"use client"

import React, { useState } from 'react'
import { registerFlow } from './types'
import SignIn from './sign-in-card'
import SignUp from './sign-up-card'

const AuthScreen = () => {
    const [state, setState] = useState<registerFlow>("signIn")
    return (
        <section>
            {
                state === "signIn" ? <SignIn />
                    : <SignUp />
            }
        </section>
    )
}

export default AuthScreen