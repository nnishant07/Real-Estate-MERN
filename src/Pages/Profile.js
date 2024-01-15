import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../GoogleFirebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../Redux/user/UserSlice';

const Profile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess,setUpdateSuccess]=useState(false);

  const [info, setInfo] = useState({  
    email: currentUser.email,
    name: currentUser.name,
    password: currentUser.password,
    avatar: currentUser.avatar,

  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setFileUploadError(false)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error('Error uploading file:', error);
        setFilePerc(0); // Reset file percentage to 0 when there's an error
      },
      () => {
        setFileUploadError(false); // Reset error state when upload is successful
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInfo({ ...info, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e)=>{
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
    
      const res= await fetch(`/api/update/${currentUser._id}`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...info})
      })

      const data= await res.json();
      console.log(data);
      if (data.success === false){
        dispatch(updateUserFailure(data.message));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDelete =async (e)=>{
    e.preventDefault();
    try{
      dispatch(deleteUserStart());
    
      const res= await fetch(`/api/delete/${currentUser._id}`,{
        method: "DELETE",
      })

      const data= await res.json();
      console.log(data);
      if (data.success === false){
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async()=>{
    try{
      dispatch(signOutUserStart());
      const res = await fetch('/api/signout');

      const data = await res.json();

      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
      }
      else{
        dispatch(signOutUserSuccess());
      }
    }catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }
  return (
    <div>
      <Header />
      <Container fluid className='d-flex align-items-center justify-content-center'>
        <div className='mask gradient-custom-3'></div>
        <Card className='m-5' style={{ maxWidth: '600px', border: 'none', }}>
          <Card.Body className='px-5'>
            <h2 className="text-uppercase text-center mb-5">profile</h2>
            <Form style={{ width: '100%' }}>
              <div className="text-center mb-4">
              <input onChange={(e) => {
                  setFile(e.target.files[0])
                }} type='file' ref={fileRef} hidden accept='image/*' />
                <img
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  src={info.avatar}
                  alt="Profile"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
                <p>
                  {fileUploadError ? <span style={{ color: 'red' }}>Error image upload</span> : null}
                  {filePerc > 0 && filePerc < 100 && (
                    <span>{`Uploading ${filePerc}%`}</span>
                  )}
                  {filePerc === 100 && (
                    <span style={{ color: 'green' }}>Upload complete</span>
                  )}
                </p>
              </div>
              <Form.Group className='mb-4'>
                <Form.Control type='text' placeholder='Your Name' size='lg' name='name' value={info.name}  onChange={handleChange}/>
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='email' placeholder='Your Email' size='lg' name='email'  value={info.email}  onChange={handleChange}/>
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='password' placeholder='Password' size='lg' name='password' value={info.password} onChange={handleChange}/>
              </Form.Group>
              <Button
                className='mb-4 w-100'
                size='lg'
                style={{
                  backgroundColor: 'rgb(51,65,85)',
                  color: 'white',
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'LOADING...': 'UPDATE'}
              </Button>
              <Link to="/create-listing" style={{ textDecoration: 'none' }}>
                <button
                  className='mb-4 w-100 btn btn-lg'
                  style={{
                    backgroundColor: '#6ABE5D',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                  }}
                  disabled={loading}
                >
                  CREATE LISTING
                </button>
              </Link>
              <div className="w-100 d-flex justify-content-between">
                <Link onClick={handleDelete} style={{ color: 'red', textDecoration: 'None' }}>Delete Account</Link>
                <Link onClick={handleSignOut} style={{ color: 'red', textDecoration: 'None' }}>Sign Out</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    {error && (
      <p
        className='text-red-500'
        style={{
          position: 'fixed',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#f8d7da',
                  padding: '10px',
                  color: 'red',
                  margin: '0',
                  zIndex: 1000,
        }}
      >
        {error}
      </p>
    )}

{updateSuccess && (
      <p
        className='text-green-500'
        style={{
          position: 'fixed',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#8FDB81',
                  padding: '10px',
                  color: 'white',
                  margin: '0',
        }}
      >
        User Updated Successfully!!!
      </p>
    )}
    </div>
  )
}

export default Profile;
