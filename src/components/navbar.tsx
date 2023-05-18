import { Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface NavbarProps{
    username: string;
    imageProfile: string;
}

export const Navbar = ({username, imageProfile}: NavbarProps) => {
    const[user] = useAuthState(auth);
    const navigate = useNavigate();


    const signUserOut = async () => {
        await signOut(auth);
        navigate('/login');
    };
    
    return (
        <div className='navbar'>
            <div className='links'>
                <Link className='btn btn-outline-light btn-sm' to="/"> Home </Link>
                {!user ? (
                <Link className='btn btn-outline-light btn-sm' to="/login"> Login </Link>
                 ) : (
                <Link className='btn btn-outline-light btn-sm' to="/createpost">Create Post</Link>
                 )}
            </div>
            <div className='user'>
                {user && (
                    <>
                        <p className='user-name mt-1'>
                          {
                            username ||
                            user?.displayName || 
                            (user?.email && 
                            user?.email.split('@')[0])
                          }
                        </p>
                        <Link to="/profile">
                        <img src=
                          { imageProfile ||
                            user?.photoURL || 
                            'https://cdn.vectorstock.com/i/1000x1000/22/05/male-profile-picture-vector-1862205.webp'
                          }  alt="Photo"/>
                        </Link>
                        <button className='btn' onClick={signUserOut}>Log Out</button>
                    </>
                ) } 
            </div> 
        </div>
    )

    
}