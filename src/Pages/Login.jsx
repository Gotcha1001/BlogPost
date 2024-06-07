import { useState } from 'react';
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import clickSound from '../assets/angelical-pad-143276.mp3';

export default function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        // Check if the email is a valid format
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Check if email and password are not empty
        if (!email || !password) {
            alert('Please enter an email and password');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            // Redirect to home page for new users
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignIn = async () => {
        // Check if email and password are not empty
        if (!email || !password) {
            alert('Please enter an email and password');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            // Check if the user has any blogs
            // Redirect to MyBlogs page for returning users
            navigate("/myblogs");
            playClickSound(); // Play sound on successful login
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
                alert('Please register');
            } else {
                console.error(err);
            }
        }
    };


    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setEmail('');
            setPassword('');
            // Check if the user has any blogs
            // Redirect to MyBlogs page for returning users
            navigate("/myblogs");
            playClickSound(); // Play sound on successful login
        } catch (err) {
            console.error(err);
        }
    };

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <style>
                {`
                    @keyframes gradientAnimation {
                        0% {
                            background-position: 0% 50%;
                        }
                        100% {
                            background-position: 100% 50%;
                        }
                    }
                    .login-card {
                        background: linear-gradient(300deg, #000000, #ffffff);
                        animation: gradientAnimation 10s ease infinite alternate;
                        transition: transform 0.3s;
                        margin: 0 auto;
                        transform-origin: center;
                    }
                    .login-card:hover {
                        transform: scale(1.05);
                    }
                `}
            </style>
            <div className="flex flex-col items-center bg-teal-900 text-white p-6 rounded-lg shadow-lg gap-4 w-full max-w-md border-4 border-white hover:bg-teal-800 transition duration-900 login-card">
                <input
                    className="px-4 mt-3 py-2 rounded bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="px-4 mt-3 py-2 rounded bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegistering ? (
                    <button
                        className="px-6 mt-3 py-3 text-lg text-white rounded-lg bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => {
                            handleRegister();
                        }}
                    >
                        Register
                    </button>
                ) : (
                    <button
                        className="px-6 mt-3 py-3 text-lg text-white rounded-lg bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => {
                            handleSignIn();
                        }}
                    >
                        Sign In
                    </button>
                )}
                <button
                    className="px-6 mt-3 py-3 text-lg text-white rounded-lg bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => {
                        handleSignInWithGoogle();
                    }}
                >
                    Sign in with Google
                </button>
                <button
                    className="px-6 mt-3 py-3 text-lg text-white rounded-lg bg-gray-950 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                    {isRegistering ? 'Already have an account? Sign In' : 'No account? Register'}
                </button>
            </div>
        </div>
    );
}
