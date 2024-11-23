import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { CiLogin } from "react-icons/ci";
import { Separator } from '../ui/separator';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { registerFlow } from './types';
import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Loader } from 'lucide-react';
interface SignUpProps {
    setState: (state: registerFlow) => void
}
const SignUp = ({ setState }: SignUpProps) => {
    // ---------------------start states ------------------------
    const [isSignInLoading, setIsSignInLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isGithubLoading, setIsGithubLoading] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string | null>(null)

    const { signIn } = useAuthActions();

    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',
        confirmPassword: ''
    })
    // ---------------------end states ------------------------

    // ---------------------start funcs--------------------
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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setError(null)
        setIsSignInLoading(true)
        const { name, email, password, confirmPassword } = formData

        if (password !== confirmPassword) {
            setError("password don't match")
            return
        }



        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Invalid Email or Password ")
            })
            .finally(
                () => {
                    setIsSignInLoading(false)
                }
            )




        console.log(formData)
    }

    // ---------------------end funcs--------------------
    return (
        <Card className=' bg-[#eee]'>
            <CardHeader>

                <CardTitle className=' text-primary  text-xl'>
                    <div className="flex justify-between items-center">
                        <p>
                            Sign Up To Continue
                        </p>
                        <CiLogin
                            className=' text-2xl text-primary'
                        />


                    </div>
                </CardTitle>

                <CardDescription className=' text-primary '>

                    <span>
                        Enter your Name , Email  and password
                    </span>

                </CardDescription>

            </CardHeader>


            <CardContent className='w-[450px]'>
                <form
                    onSubmit={handleSubmit}
                    className=' flex flex-col focus-within:w-full '>


                    <div className="input-focus-effect ">
                        <input

                            value={formData.name}
                            type="text"
                            className="input-style"
                            placeholder="Ex:Mohamed Mostafa "
                            disabled={false}
                            required
                            onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                        />

                    </div>

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
                    <div className="input-focus-effect">
                        <input
                            value={formData.confirmPassword}
                            type="password"
                            className="input-style"
                            placeholder="Confir The Password"
                            disabled={false}
                            required
                            onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }) }}
                        />
                    </div>
                    <Button type='submit' >


                        {
                            isSignInLoading ? <Loader className=' animate-spin' /> : "Sign Up"
                        }
                    </Button>
                </form>
                <Separator />

                {/* start  continue with (google and github ) */}
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={false}
                        onClick={() => handleProviderSignIn('google')}
                        variant="outline"
                        className='relative'
                        size={"lg"}
                    >
                        <FcGoogle className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />
                        continue wih google
                    </Button>
                    <Button disabled={false}
                        onClick={() => handleProviderSignIn('github')}
                        variant="outline"
                        className='relative'
                        size={"lg"}>
                        <FaGithub className=' absolute top-1/2 left-2 -translate-y-1/2  text-2xl' />

                        continue wih with github

                    </Button>
                </div>
                {/* end    continue with (google and github ) */}

                <p className='mt-2'>Already have an account ? <span className='cursor-pointer hover:underline text-sky-700'
                    onClick={() => setState("signIn")}
                >sing in</span> </p>

            </CardContent>
        </Card>
    )
}

export default SignUp