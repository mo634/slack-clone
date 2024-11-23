
import { Button } from '../ui/button'
import Loader from '../Loader'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
interface ProviderButtonProps {
    handleProviderSignIn: (provider: 'google' | 'github') => Promise<void>;
    loadingState: boolean;
    type: string
}
const ProviderButton = ({ handleProviderSignIn, loadingState, type }: ProviderButtonProps) => {
    return (
        <div className="flex flex-col gap-y-2.5">
            <Button
                disabled={loadingState}
                onClick={() => handleProviderSignIn("google")}
                variant="outline"
                className={`relative my-2 ${loadingState} ? "bg-transparent" : ""} w-full`}
                size={"lg"}
            >
                {
                    loadingState ? <Loader />

                        :
                        <>
                            {
                                type === "google" ? <FcGoogle
                                    className=' text-2xl mr-3'
                                /> : <FaGithub className='text-2xl mr-3' />
                            }
                            <p className="text-lg text-primary">continue wih {type}</p>
                        </>


                }
            </Button>

        </div>
    )
}

export default ProviderButton

