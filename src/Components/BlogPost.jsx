import { db } from '../config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import clickSound from '../assets/angelical-pad-143276.mp3'; // Import the sound file

export default function BlogPost({ user }) {
    const [blogsList, setBlogsList] = useState([]);

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
    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    return (
        <div className="flex justify-center">
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
                            <p>Author : {blog.author}</p>
                            <p className="mt-4">Content: {blog.content}</p>
                        </div>
                    </div>
                ))}
                {/* Example link with sound effect
                   <a href="#" onClick={playClickSound}>Click me to play sound</a>
                */}

            </section>
        </div>
    );
}
