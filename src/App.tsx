import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "./config/firebase";
import {Main} from './pages/main/Main';
import {Login} from './pages/Login';
import { NotFound } from './pages/NotFound';
import {Navbar} from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import SignUp from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePost} from './pages/update/UpdatePost';
import {Profile} from "./pages/Profile";
import { useState, useEffect } from 'react';
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';


function App() {
  const [username, setUsername] = useState<string>('');
  const [imageProfile, setImageProfile] = useState<string>('');
  const imageRef = ref(storage, "imgProfile/");
  const [user] = useAuthState(auth);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const postsRef = collection(db, 'posts');
      const querySnapshot = await getDocs(query(postsRef, where('userId', '==', user.uid)));
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          username: username || user.displayName,
        });
      });
      setUsername((prevUsername) => username || prevUsername || user.displayName || '');
      window.alert('Your username has been uploaded successfully!!');
    }
  };

  const handleImageProfileChange = (url: string) => {
    setImageProfile(url);
      if (auth.currentUser) {
      updateProfile(auth.currentUser, {
      photoURL: url,
      });
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName || '');
      if (user.photoURL) {
        setImageProfile(user.photoURL);
      } else {
        listAll(imageRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageProfile(url);
              updateProfile(user, {
                photoURL: url,
              });
            });
          });
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar 
          username={username} 
          imageProfile={imageProfile}
        />
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path='/updatepost/:id' element={<UpdatePost/>} />
          <Route path='/profile' element= {
            <Profile
            handleUsernameSubmit={handleUsernameSubmit} 
            handleImageProfileChange={handleImageProfileChange}
            handleUsernameChange={handleUsernameChange}
            />
            } />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
