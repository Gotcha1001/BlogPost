import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebase"; // Import your firebase config
import { collection, addDoc } from "firebase/firestore";

export default function CreateBlog({ user }) {
    // state for the images
    const [isHovered1, setIsHovered1] = useState(false);
    const [imageSrc1, setImageSrc1] = useState("https://images.pexels.com/photos/19439056/pexels-photo-19439056/free-photo-of-food-wood-black-and-white-dawn.jpeg?auto=compress&cs=tinysrgb&w=800");
    const [hoveredImageSrc1, setHoveredImageSrc1] = useState("https://images.pexels.com/photos/25323314/pexels-photo-25323314/free-photo-of-a-dark-and-foggy-forest-with-trees-and-fog.jpeg?auto=compress&cs=tinysrgb&w=800");

    const [isHovered2, setIsHovered2] = useState(false);
    const [imageSrc2, setImageSrc2] = useState("https://images.pexels.com/photos/7322122/pexels-photo-7322122.jpeg?auto=compress&cs=tinysrgb&w=800");
    const [hoveredImageSrc2, setHoveredImageSrc2] = useState("https://images.pexels.com/photos/21714436/pexels-photo-21714436/free-photo-of-espiritu.jpeg?auto=compress&cs=tinysrgb&w=800");

    const [isHovered3, setIsHovered3] = useState(false);
    const [imageSrc3, setImageSrc3] = useState("https://media.istockphoto.com/id/1483625643/photo/human-hands-silhouette-behind-frosted-glass.jpg?b=1&s=612x612&w=0&k=20&c=aInC86I5tmHZwfC7Zp5fpnRblIS2riRGkzBeJDyBWCs=");
    const [hoveredImageSrc3, setHoveredImageSrc3] = useState("https://images.pexels.com/photos/4063235/pexels-photo-4063235.jpeg?auto=compress&cs=tinysrgb&w=800");

    // state for the create blog to firebase
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();

    // state for the dialog visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // images logic using state - hovering over the image to change
    const handleMouseEnter1 = () => {
        setIsHovered1(true);
        setImageSrc1(hoveredImageSrc1);
    };

    const handleMouseLeave1 = () => {
        setIsHovered1(false);
        setImageSrc1("https://images.pexels.com/photos/7098932/pexels-photo-7098932.jpeg?auto=compress&cs=tinysrgb&w=800");
    };

    const handleMouseEnter2 = () => {
        setIsHovered2(true);
        setImageSrc2(hoveredImageSrc2);
    };

    const handleMouseLeave2 = () => {
        setIsHovered2(false);
        setImageSrc2("https://images.pexels.com/photos/5622821/pexels-photo-5622821.jpeg?auto=compress&cs=tinysrgb&w=800");
    };

    const handleMouseEnter3 = () => {
        setIsHovered3(true);
        setImageSrc3(hoveredImageSrc3);
    };

    const handleMouseLeave3 = () => {
        setIsHovered3(false);
        setImageSrc3("https://images.pexels.com/photos/2035214/pexels-photo-2035214.jpeg?auto=compress&cs=tinysrgb&w=800");
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const date = new Date();

        try {
            await addDoc(collection(db, "blogs"), {
                author,
                content,
                date,
                imgUrl,
                title,
                userId: auth?.currentUser?.uid // Store the user ID in the blog post
            });
            navigate("/myblogs");
            setIsDialogOpen(false); // Close the dialog after successful submission

            // Play the sound
            const submitSound = document.getElementById("submitSound");
            if (submitSound) {
                submitSound.play();
            }

        } catch (err) {
            setError("Failed to create the blog post. Please try again.");
        }
    }
    <audio id="submitSound" src="../assets/scratch.mp3"></audio>

    return (
        <div className="flex flex-col items-center min-h-screen" style={{ background: 'linear-gradient(300deg, #000000, #ffffff)' }}>
            <div className="w-full flex justify-between px-4 py-2 bg-black text-white">
                <h1 className="text-2xl font-bold">Blog Creation App</h1>
                <div className="flex items-center space-x-4">
                    {user && (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            </div>

            <button
                onClick={() => setIsDialogOpen(true)}
                className="mt-8 bg-blue-500 text-white p-2 rounded"
            >
                Create New Blog
            </button>

            <div className="flex flex-col items-center mt-5 sm:flex-row sm:flex-wrap sm:justify-center relative">
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
                        <img src={imageSrc1} className="card-img-top" alt="Safe Place" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Safe</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Place</p>
                        </div>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
                        <img src={imageSrc2} className="card-img-top" alt="Confidential Diary" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>This is your most secret Diary</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Confidential</p>
                        </div>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2" style={{ width: '20rem', height: '40rem' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }} onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseLeave3}>
                        <img src={imageSrc3} className="card-img-top" alt="Free Place" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                        <div className="card-body text-center border border-white rounded hover:text-teal-500 hover-animation p-4 d-flex flex-column justify-content-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                            <h1 className="card-title" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>This is your most secret Diary</h1>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Confidential</p>
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    id="imgUrl"
                                    value={imgUrl}
                                    onChange={(e) => setImgUrl(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                Create Blog
                            </button>
                        </form>
                        <button
                            onClick={() => setIsDialogOpen(false)}
                            className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
