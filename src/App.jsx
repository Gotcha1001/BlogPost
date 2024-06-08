import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from './config/firebase';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import CreateBlog from './Pages/CreateBlog';
import Home from './Pages/Home';
import MyBlogs from './Pages/MyBlogs';
import UpdateBlogs from './Pages/UpdateBlogs';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <div className="red">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/myblogs" element={<MyBlogs user={user} />} />
          <Route path="/updateblogs" element={<UpdateBlogs user={user} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
