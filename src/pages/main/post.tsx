import {addDoc, getDocs, deleteDoc, collection, query, where, doc} from "firebase/firestore";
import { Post as IPost} from "./Main";
import {db, auth} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const {post} = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");
  const likesDocs = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDocs)
    setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
  }

  const addLike = async () => {
    try{
      const newDoc = await addDoc(likesRef, {userId: user?.uid, postId: post.id });
        if(user) {
          setLikes((prev) => 
            prev 
            ? [...prev, {userId: user.uid, likeId: newDoc.id}] 
            :[{userId: user.uid, likeId: newDoc.id}]
            );
          }
        } catch (err) {
          console.log(err);
        }
  };

  const removeLike = async () => {
    try{
      const likeToDeleteQuery = query(
        likesRef, 
        where("postId", "==", post.id),   
        where("userId", "==", user?.uid)
        );

  const likeToDeleteData = await getDocs(likeToDeleteQuery);
  const likeId = likeToDeleteData.docs[0].id;
  const likeToDelete = doc(db, "likes", likeId);
  await deleteDoc(likeToDelete);
      if(user) {
        setLikes(
            (prev) => prev && prev.filter((like) => like.likeId !== likeId));
        }
      } catch (err) {
       console.log(err);
      }
};

const removePost = async () => {
  try {
    await deleteDoc(doc(db, "posts", post.id));
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

const hasUserLiked = likes?.find((like) => like.userId === user?.uid)
const canUpdateOrRemove = post.userId === user?.uid;

useEffect(() => {
  getLikes();
},[]);

  return  (
    <>
    {user && (
        <div className="card pt-2">
          {canUpdateOrRemove && (
            <div className="dropdown">
            <button className="x btn btn-transparent d-transparent dropdown-toggle update-remove-tbn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              onClick={(e) => {( e.target as HTMLButtonElement).blur(); }}
              style={{ outline: 'none' }}>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" 
                onClick={removePost}>
                Delete
              </a></li>
              <li>
                <Link 
                  className="dropdown-item" 
                  to={`/updatepost/${post.id}`} >
                  Update
                </Link>
              </li>
            </ul>
        </div>
        )}
        
        <div><h4>{post.title}</h4></div>
        <div>
          <p className="description p-3">{post.description}</p>
        </div>
        <div className="footer mb-0 d-flex justify-content-start">
            <p className="font-weight-light font-italic username-footer">
              @{post.username || (user?.providerData[0]?.email === user?.email 
              && user?.email?.split('@')[0])}
            </p>
            <button className="like-btn" 
              onClick={hasUserLiked 
              ? 
              removeLike : addLike}> 
              {hasUserLiked ? <>&#128078;</> 
              : 
              <>&#128077;</>} 
            </button>
            {likes && likes.length > 0 && <p className="username-footer"> Likes: {likes?.length}</p>}
        </div>
      </div>
  )}
</>
);

}