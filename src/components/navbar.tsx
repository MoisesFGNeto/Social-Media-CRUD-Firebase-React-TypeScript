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
    <nav className="navbar navbar-expand-md">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon"><i className='fa fa-bars'></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbar-nav mr-auto'>
                <li><Link className='btn btn-outline-light btn-sm nav-item' to="/"> Home </Link></li>
                    {!user ? (
                <li><Link className='btn btn-outline-light btn-sm nav-item' to="/login"> Login </Link></li>
                    ) : (
                <li><Link className='btn btn-outline-light btn-sm nav-item mr-auto' to="/createpost">Create Post</Link></li>
                )}
            </ul>
            <div className='mt-2' id='user-info'>
            {user && (
            <>  
            <div className="user-info d-flex align-items-center">
                <Link 
                    to="/profile">
                    <img src=
                    { imageProfile ||
                    user?.photoURL || 
                    'https://cdn.vectorstock.com/i/1000x1000/22/05/male-profile-picture-vector-1862205.webp'
                    }  alt="Photo" className='profile-image'/>
                </Link>
                <p className='user-name m-2'>
                    {
                    username ||
                    user?.displayName || 
                    (user?.email && 
                    user?.email.split('@')[0])
                    }
                </p>
                <button className='btn username-logout ml-1' 
                    onClick={signUserOut}>
                    Log Out
                </button>
            </div>
            </>
            ) } 
        </div>
        </div>
        
    </nav>
    )}