import StyledInput from "../components/StyledInput.tsx";
import {IoMdPerson} from "react-icons/io";
import {useState} from "react";
import {FaKey} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useApp} from "../context/AppContext.tsx";
import {useToast} from "../context/ToastContext.tsx";
import {signinService} from "../services/apiServices.ts";
import {SignInObject} from "../interfaces/api.ts";
import {UserObject} from "../interfaces/user.ts";

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const {login} = useApp();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (username && password && !usernameError && !passwordError) {
            const obj: SignInObject = {
                username: username,
                password: password
            };
            const res = await signinService(obj);
            if (res.success) {
                login(res.body as { user: UserObject; token: string});
                navigate('/');
            } else {
                showToast({ type: "error", message: res.message})
            }
        } else {
            showToast({ type: 'error', message: 'Please enter valid data.' });
        }
    }

    return (
        <div className="bg-base-200 pt-20 min-h-screen flex">
            <div className="flex-1 hidden md:flex">
                <div
                    className="hero"
                    style={{
                        backgroundImage: "url('/high-heel.jpg')",
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Welcome Back</h1>
                            <p className="mb-5">
                                Welcome to NexStep, where every step is a journey in style and comfort. Discover our
                                latest collection of footwear designed to elevate your every stride. Join us and step
                                into a world of unparalleled craftsmanship and innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full mx-16 md:mx-32'>
                    <div className='w-full flex justify-center items-center'>
                            <img src='/logo.png' className='w-48' alt='logo'/>
                        </div>
                        <div className='w-full flex justify-center items-center mb-8'>
                            <h3 className='text-xl'>Sign in to your account</h3>
                        </div>
                        <div className='mb-4'>
                            <StyledInput icon={<IoMdPerson/>} placeholder='username' value={username} type='text'
                                         changeHandler={(e) => setUsername((e.target as HTMLInputElement).value)}
                                         blurHandler={() => {
                                             if (username.length < 6) {
                                                 setUsernameError("Username cannot be shorter than 6 characters");
                                             } else {
                                                 setUsernameError("");
                                             }
                                         }}
                            />
                            {usernameError &&
                                <div className='text-error'>
                                    {usernameError}
                                </div>
                            }
                        </div>
                        <div className='mb-4'>
                            <StyledInput icon={<FaKey/>} placeholder='password' value={password} type='password'
                                         changeHandler={(e) => setPassword((e.target as HTMLInputElement).value)}
                                         blurHandler={() => {
                                             if (password.length < 8) {
                                                 setPasswordError("Password cannot be shorter than 8 characters");
                                             } else {
                                                 setPasswordError("");
                                             }
                                         }}
                            />
                            {passwordError &&
                                <div className='text-error'>
                                    {passwordError}
                                </div>
                            }
                        </div>
                        <button className='btn btn-primary w-full mb-2' onClick={handleSignIn}>Sign in</button>
                        <h5>Still haven't account? <Link to='/signup' className='link link-primary'>Signup</Link></h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
