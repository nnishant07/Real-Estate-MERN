import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../GoogleFirebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div>
      <Header />
      <Container fluid className='d-flex align-items-center justify-content-center'>
        <div className='mask gradient-custom-3'></div>
        <Card className='m-5' style={{ maxWidth: '600px', border: 'none' }}>
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
                  src={formData.avatar || currentUser.avatar}
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
                <Form.Control type='text' placeholder='Your Name' size='lg' />
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='email' placeholder='Your Email' size='lg' />
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='password' placeholder='Password' size='lg' />
              </Form.Group>
              <Button
                className='mb-4 w-100'
                size='lg'
                style={{
                  backgroundColor: 'rgb(51,65,85)',
                  color: 'white',
                  borderColor: 'rgb(51,65,85)',
                }}
              >
                UPDATE
              </Button>
              <div className="w-100 d-flex justify-content-between">
                <Link to="#" style={{ color: 'red', textDecoration: 'None' }}>Delete Account</Link>
                <Link to="/signin" style={{ color: 'red', textDecoration: 'None' }}>Sign Out</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Profile;
