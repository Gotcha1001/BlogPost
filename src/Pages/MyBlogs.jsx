import React, { useState, useEffect } from "react";
import BlogPost from "../Components/BlogPost";
import { db, auth } from "../config/firebase"; // Import your firebase config

export default function MyBlogs() {
    const [isHovered1, setIsHovered1] = useState(false);
    const [imageSrc1, setImageSrc1] = useState("https://images.pexels.com/photos/19439056/pexels-photo-19439056/free-photo-of-food-wood-black-and-white-dawn.jpeg?auto=compress&cs=tinysrgb&w=800");

    const [isHovered2, setIsHovered2] = useState(false);
    const [imageSrc2, setImageSrc2] = useState("https://images.pexels.com/photos/5622821/pexels-photo-5622821.jpeg?auto=compress&cs=tinysrgb&w=800");

    const [isHovered3, setIsHovered3] = useState(false);
    const [imageSrc3, setImageSrc3] = useState("https://media.istockphoto.com/id/1483625643/photo/human-hands-silhouette-behind-frosted-glass.jpg?b=1&s=612x612&w=0&k=20&c=aInC86I5tmHZwfC7Zp5fpnRblIS2riRGkzBeJDyBWCs=");

    const [user, setUser] = useState(null);

    // Add logic to fetch or initialize user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    const handleMouseEnter1 = () => {
        setIsHovered1(true);
        // Handle mouse enter logic for image 1
    };

    const handleMouseLeave1 = () => {
        setIsHovered1(false);
        // Handle mouse leave logic for image 1
    };

    const handleMouseEnter2 = () => {
        setIsHovered2(true);
        // Handle mouse enter logic for image 2
    };

    const handleMouseLeave2 = () => {
        setIsHovered2(false);
        // Handle mouse leave logic for image 2
    };

    const handleMouseEnter3 = () => {
        setIsHovered3(true);
        // Handle mouse enter logic for image 3
    };

    const handleMouseLeave3 = () => {
        setIsHovered3(false);
        // Handle mouse leave logic for image 3
    };

    return (
        <div className="flex flex-col items-center min-h-screen" style={{ background: 'linear-gradient(300deg, #000000, #ffffff)' }}>
            <div className="flex flex-wrap justify-center">
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
                        <img src={imageSrc1} className="card-img-top" alt="Secret Diary" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Safe</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Place</p>
                        </div>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
                        <img src={imageSrc2} className="card-img-top" alt="Secret Diary" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>This is your most secret Diary</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Confidential</p>
                        </div>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseLeave3}>
                        <img src={imageSrc3} className="card-img-top" alt="Stay Free" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Stay</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Free</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div style={{ width: '80%' }}>
                    <BlogPost user={user} />
                </div>
            </div>
        </div>
    );
}
