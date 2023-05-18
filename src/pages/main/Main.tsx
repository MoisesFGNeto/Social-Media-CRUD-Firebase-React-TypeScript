import {getDocs, collection} from "firebase/firestore";
import {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, db} from "../../config/firebase";
import { Post } from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}
export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postRef = collection(db, "posts");
    const [user] = useAuthState(auth);

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <div className="main-page">
            {user ? ''
            : 
            <>
            <h1 className="home-description">Welcome</h1>
            <h1 className="home-description">Login to see your posts.</h1>
            </>
            }
            {postsList?.map((post) => 
            <Post key={post.id} post={post}/>
            )}
        </div> 
    )
};