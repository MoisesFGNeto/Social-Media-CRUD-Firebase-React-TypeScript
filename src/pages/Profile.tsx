import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4 } from "uuid";

export interface Props{
  handleUsernameSubmit: (newUsername: any) => void;
  handleImageProfileChange: (url: string) => void;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Profile = ({handleUsernameSubmit, handleImageProfileChange, handleUsernameChange}: Props) => {
    const [imageUpload, setImageUpload] = useState<File>();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageProfile, setImageProfile] = useState<string>('');
    const[user] = useAuthState(auth);

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `imgProfile/${imageUpload.name + v4()}`);
        setIsUploading(true);
        uploadBytes(imageRef, imageUpload).then(() => {
          getDownloadURL(imageRef).then((url) => {
            setImageProfile(url);
            handleImageProfileChange(url);
          setIsUploading(false);
          alert("Image Uploaded");
        });
    });
};

    return (
    <>
<div className="container bootstrap snippets bootdey">
    <h1 className="text-light">Edit Profile</h1>
    <hr/>
    <div className="row">
        <div className="col-md-3">
            <div className="text-center">
                <img 
                    src={
                      imageProfile ||
                      user?.photoURL ||
                      'https://cdn.vectorstock.com/i/1000x1000/22/05/male-profile-picture-vector-1862205.webp'
                    } 
                    className="avatar img-circle img-thumbnail" 
                    alt="avatar"
                    />
                <h6 className="mt-3 mb-3">Upload a different photo...</h6>
                <input 
                  type="file" 
                  className="form-control mb-4"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    (event.target.files?.[0] && setImageUpload(event.target.files[0]));
                  }}
                  />
                <button 
                  className='btn btn-primary mb-3 upload-btn'
                  onClick={uploadImage}
                >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            </div>
        </div>
        <div className="col-md-9 personal-info">
            <div className="alert alert-info alert-dismissable">
                <a className="panel-close close" data-dismiss="alert">x</a> 
                <i className="fa fa-coffee"></i>
                Please fill <strong>this form</strong> to save your username.
            </div>
            <h3 className='personal-info-h3'>Personal info</h3>
            <form className="form-horizontal mt-3">
                <div className="form-group">
                    <label className="col-lg-1 mr-4 control-label username-input">Username:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" onChange={handleUsernameChange}/>
                  </div>
                </div>
                <div className='btns-profile'>
                    <button className="btn btn-profile-update" onClick={handleUsernameSubmit}>Submit</button>
                    <Link to="/"><button className='btn btn-profile-update'>Cancel</button></Link>
                </div>
            </form>
        </div>
    </div>
<hr/>
</div>

</>
)}