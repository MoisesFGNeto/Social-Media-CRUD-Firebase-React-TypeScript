import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description")
  });

  const {register,
         handleSubmit,
        formState: {errors},
        } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    try {
      const newDoc = await addDoc(postRef, {
        ...data,
        username: user?.displayName || (user?.email && user?.email.split('@')[0]),
        userId: user?.uid,
      });
      console.log("Post created:", newDoc.id);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <form className="form-app" onSubmit={handleSubmit(onCreatePost)}>
      <input className="post-field input" type="text" placeholder="Title..." {...register("title")} />
      <h6 className="error-message">{errors.title?.message}</h6>
      <textarea placeholder="Description..." {...register("description")}/>
      <h6 className="error-message">{errors.description?.message}</h6>
      <input className="submit-btn" type="submit" />
    </form>
  )
}

