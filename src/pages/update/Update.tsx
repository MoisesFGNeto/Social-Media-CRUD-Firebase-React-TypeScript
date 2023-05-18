import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface Props {
  id: string;
}

export const Update = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const {id} = props;
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      const postRef = doc(db, "posts", id);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const data = postDoc.data();
        setTitle(data?.title || "");
        setDescription(data?.description || "");
      };
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postRef = doc(db, "posts", id);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      console.log("No such document!");
    } else {
      await updateDoc(postRef, {
        title: title || postDoc.data()?.title,
        description: description || postDoc.data()?.description,
      });
      navigate("/");
    };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (

    <form className="form-update" onSubmit={handleSubmit}>
      <input className="post-field input" onChange={handleTitleChange} value={title} type="text" placeholder="Title..." />
      <h6 className="error-message"></h6>
      <textarea placeholder="Description..." onChange={handleDescriptionChange} value={description}/>
      <h6 className="error-message"></h6>
      <div className="buttons">
        <input className="btn submit-btn" type="submit" />
        <a className="btn submit-btn" href="/">Cancel</a>
      </div>
    </form>

  )};
 


