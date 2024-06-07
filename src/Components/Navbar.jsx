import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import clickSound from '../assets/scratch.mp3';

export default function Navbar({ user, logout }) {
    return (
        <nav className="nav flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-2 sm:p-1">
            <div className="flex items-center p-1">
                <Link to="/" className="site-title text-white text-xl">Your Secret Blog</Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center p-2 sm:p-2">
                {user && (
                    <span className="text-white mr-0 sm:mr-4 hover:bg-teal-700 p-2 rounded-md">Welcome, {user.email}</span>
                )}
            </div>
            <div className="flex flex-col sm:flex-row items-center">
                {user && (
                    <CustomLink className="text-white px-2 py-1 my-1 sm:my-0 rounded hover:bg-teal-700" to="/createblog">Create a Blog</CustomLink>
                )}
                {user && (
                    <CustomLink className="text-white px-2 py-1 my-1 sm:my-0 rounded hover:bg-teal-700" to="/myblogs">My Blogs</CustomLink>
                )}
                {user && (
                    <CustomLink className="text-white px-2 py-1 my-1 sm:my-0 rounded hover:bg-teal-700" to="/updateblogs">Update Blog</CustomLink> // Add new link
                )}
                {user && (
                    <button
                        onClick={logout}
                        className="text-white px-2 py-1 my-1 sm:my-0 rounded hover:bg-teal-700 ml-0 sm:ml-2"
                    >
                        Log Out
                    </button>
                )}
                {!user && <CustomLink className="my-1 sm:my-0 hover:bg-teal-700" to="/login">Login</CustomLink>}
            </div>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    const navigate = useNavigate();


    //FUNCTION TO PLAY THE SOUND WHEN WE CLICK.... 
    const handleClick = (e) => {
        e.preventDefault();
        playSoundAndNavigate(to, navigate);
    };

    const classNames = `text-white px-2 py-1 rounded ${isActive ? 'active' : ''} ${props.className}`;

    return (
        <Link to={to} {...props} onClick={handleClick} className={classNames}>
            {children}
        </Link>
    );
}


//code to generate a sound when the links are pressed.... 
const playSoundAndNavigate = (url, navigate) => {
    const audio = new Audio(clickSound);
    audio.play();

    setTimeout(() => {
        navigate(url);
    }, 2000); // Adjust the timeout duration to the length of your sound
};