import { db } from '../config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import clickSound from '../assets/angelical-pad-143276.mp3'; // Import the sound file
import '../index.css'; // Import the CSS file containing gradient styles

export default function BlogPost({ user }) {
    const [blogsList, setBlogsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        async function getBlogPostList() {
            try {
                if (user) {
                    const blogsCollectionRef = collection(db, 'blogs');
                    const q = query(blogsCollectionRef, where('userId', '==', user.uid));
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogsList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        playClickSound();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    return (
        <div className="flex justify-center">
            <section className="flex flex-col items-center w-full max-w-4xl mx-auto">
                {currentPosts.map((blog) => (
                    <div key={blog.id} className="max-w-xl w-full bg-teal-900 text-white rounded-lg shadow-2xl  m-4 gradient-background2">
                        <img
                            src={blog.imgUrl}
                            alt={blog.title}
                            className="w-full h-64 object-cover rounded-t-lg hover-blog-post-wobble"
                        />
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-2">Title: {blog.title}</h1>
                            <p className="text-sm">Published on: {new Date(blog.date.seconds * 1000).toLocaleDateString()}</p>
                            <p>Author: {blog.author}</p>
                            // Inside the return statement of your BlogPost component
                            <p className="mt-4" style={{ whiteSpace: 'pre-line' }}>Content: {blog.content}</p>

                        </div>
                    </div>
                ))}
                <nav>
                    <ul className="pagination">
                        {[...Array(Math.ceil(blogsList.length / postsPerPage)).keys()].map((number) => (
                            <li key={number + 1} className="page-item">
                                <button onClick={() => { paginate(number + 1); playClickSound(); }} className="page-link">
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

            </section>
        </div>
    );
}