import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { getDocs, collection, query, where, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from "../config/firebase"; // Import your firebase config
import { useEffect, useState } from 'react';
import clickSound from '../assets/short-swish-swoosh-whoosh-reverbed-103501.mp3'; // Import your sound file

export default function UpdateBlog({ user }) {
    const [blogsList, setBlogsList] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        async function getBlogPostList() {
            try {
                if (user) {
                    const q = query(collection(db, 'blogs'), where('userId', '==', user.uid));
                    const data = await getDocs(q);
                    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    const sortedData = filteredData.sort((a, b) => new Date(b.date.seconds * 1000) - new Date(a.date.seconds * 1000));
                    setBlogsList(sortedData);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getBlogPostList();
    }, [user]);

    async function deleteBlog(id) {
        const blogDoc = doc(db, "blogs", id);
        await deleteDoc(blogDoc);
        setBlogsList(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        playSoundAndRedirect(); // Play sound when blog is deleted
    }

    async function handleUpdateSubmit(e) {
        e.preventDefault();
        try {
            await setDoc(doc(db, "blogs", selectedBlog.id), {
                author: selectedBlog.author,
                content: selectedBlog.content,
                date: selectedBlog.date,
                id: selectedBlog.id,
                imgUrl: selectedBlog.imgUrl,
                title: selectedBlog.title,
                userId: selectedBlog.userId, // Add the userId field to the updated blog
            });
            // Update the blogsList state with the updated blog
            setBlogsList(prevBlogs => prevBlogs.map(blog => {
                if (blog.id === selectedBlog.id) {
                    return { ...selectedBlog };
                } else {
                    return blog;
                }
            }));
            setIsDialogOpen(false);
            playSoundAndRedirect(); // Play sound when blog is updated
        } catch (err) {
            console.error("Failed to update the blog post", err);
        }
    }

    // Play sound and redirect function
    const playSoundAndRedirect = () => {
        const audio = new Audio(clickSound);
        audio.play();

        setTimeout(() => {
            window.location.reload(); // Redirect or any other action you need
        }, 2000); // Adjust the timeout duration to the length of your sound
    };



    return (
        <div className="flex justify-center items-center min-h-screen" style={{ background: 'linear-gradient(300deg, #000000, #ffffff)' }}>
            <section className="flex flex-col items-center w-full max-w-4xl mx-auto"> {/* Updated this line */}
                {blogsList.map((blog) => (
                    <div key={blog.id} className="max-w-xl w-full bg-teal-900 text-white rounded-lg shadow-lg m-4">
                        <img
                            src={blog.imgUrl}
                            alt={blog.title}
                            className="w-full h-64 object-cover rounded-t-lg hover-blog-post-wobble"
                        />
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-2"> Title : {blog.title}</h1>
                            <p className="text-sm">Published on : {new Date(blog.date.seconds * 1000).toLocaleDateString()} </p>
                            <p>By : {blog.author}</p>
                            <p className="mt-4">{blog.content}</p>
                        </div>
                        <div className="flex justify-center mb-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded mx-2"
                                onClick={() => deleteBlog(blog.id)}
                            >Delete Blog</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
                                onClick={() => {
                                    setSelectedBlog(blog);
                                    setIsDialogOpen(true);
                                }}
                            >Update Blog</button>
                        </div>
                    </div>
                ))}
            </section>

            {isDialogOpen && (
                <div className="fixed inset-0 flex justify-center items-center" style={{ background: 'linear-gradient(300deg, #000000, #ffffff)', zIndex: 50 }}>
                    <dialog open className="bg-white p-4 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update Blog Post</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={selectedBlog.title}
                                    onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    value={selectedBlog.date instanceof Date ? selectedBlog.date.toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        setSelectedBlog({ ...selectedBlog, date: isNaN(date.getTime()) ? null : date });
                                    }}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Content</label>
                                <textarea
                                    value={selectedBlog.content}
                                    onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded resize-y"
                                    style={{ minHeight: '13rem' }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    value={selectedBlog.imgUrl}
                                    onChange={(e) => setSelectedBlog({ ...selectedBlog, imgUrl: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Author</label>
                                <input
                                    type="text"
                                    value={selectedBlog.author}
                                    onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </dialog>
                </div>
            )}
        </div>
    );
}
