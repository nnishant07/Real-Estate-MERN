import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import Header from '../Components/Header';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../GoogleFirebase';

const CreateListing = () => {

  const [files,setFiles]=useState([]);
  const [filePerc, setFilePerc] = useState(0);
  const [formData,setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e)=>{
    e.preventDefault();

    if(files.length > 0 && files.length+formData.imageUrls.length<7){
      const promises = [];

      setFilePerc(1);
      for(let i=0;i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setFilePerc(0);
      }).catch((err)=>{
        setImageUploadError('Image upload error (can upload 1-6)');
        setFilePerc(0);
      })
      
    }
    else{
      setImageUploadError('You can upload between 1-6 images');
    }
  }

  const storeImage = async (file)=>{
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    })
  }

  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_,i)=> i!==index),
    });
  }
  return (
    <div>
      <Header />
      <Row className="justify-content-center mt-4">
        <Col xs={12} className="text-center">
          <h2 style={{ fontWeight: 'bold' }}>Create a Listing</h2>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col md={6} lg={6}>
            <Container fluid className='d-flex align-items-center justify-content-center'>
              <div className='mask gradient-custom-3'></div>
              <Card className='m-2' style={{ maxWidth: '1000px', minWidth: '400px', border: 'none' }}>
                <Card.Body className='px-5'>
                  <Form style={{ width: '100%' }}>
                    <Form.Group className='mb-4'>
                      <Form.Control type='text' placeholder='Name' size='lg' />
                    </Form.Group>
                    <InputGroup className='mb-4'>
                      <Form.Control as="textarea" aria-label="With textarea" placeholder='Description' size='lg' />
                    </InputGroup>
                    <Form.Group className='mb-4'>
                      <Form.Control type='text' placeholder='Address' size='lg' />
                    </Form.Group>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`} className="mb-4">
                        <Form.Check
                          inline
                          label="Sell"
                          name="group1"
                          type={type}
                          style={{ fontSize: '20px' }}
                        />
                        <Form.Check
                          inline
                          label="Rent"
                          name="group1"
                          type={type}
                          style={{ fontSize: '20px' }}
                        />
                        <Form.Check
                          inline
                          label="Parking Spot"
                          name="group1"
                          type={type}
                          style={{ fontSize: '20px' }}
                        />
                        <Form.Check
                          inline
                          label="Furnished"
                          name="group1"
                          type={type}
                          style={{ fontSize: '20px' }}
                        />
                        <Form.Check
                          inline
                          label="Offer"
                          name="group1"
                          type={type}
                          style={{ fontSize: '20px' }}
                        />
                      </div>
                    ))}
                    <Form.Group className='mb-4 d-flex align-items-center'>
                        <div style={{ width: '25%', marginRight: '10px' }}>
                            <Form.Control type='number' size='lg' defaultValue={1} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <Form.Label style={{ fontSize: '20px',  }}>Beds</Form.Label>
                        </div>
                        <div style={{ width: '25%', marginRight: '10px' }}>
                            <Form.Control type='number' size='lg' defaultValue={1} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <Form.Label style={{ fontSize: '20px',  }}>Baths</Form.Label>
                        </div>
                        </Form.Group>

                    <Form.Group className='mb-4 d-flex align-items-center'>
                        <div style={{ width: '35%', marginRight: '10px' }}>
                            <Form.Control type='number' size='lg' defaultValue={1} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <Form.Label >{
                                <div>
                                <span style={{ display: 'block',fontSize: '20px', }}>Regular price</span>
                                <span style={{ display: 'block',fontSize: '15px' }}>($ / Month)</span>

                                </div>}</Form.Label>
                        </div>
                        </Form.Group>
                        <Form.Group className='mb-4 d-flex align-items-center'>
                        <div style={{ width: '35%', marginRight: '10px' }}>
                            <Form.Control type='number' size='lg' defaultValue={1} style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginRight: '15px' }}>
                            <Form.Label >{
                                <div>
                                <span style={{ display: 'block',fontSize: '20px', }}>Discounted price</span>
                                <span style={{ display: 'block',fontSize: '15px' }}>($ / Month)</span>

                                </div>}</Form.Label>
                        </div>
                        </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <Col md={6} lg={6}>
            <Container fluid className='d-flex align-items-center justify-content-center'>
              <div className='mask gradient-custom-3'></div>
              <Card className='m-2' style={{ maxWidth: '1000px', minWidth: '400px', border: 'none' }}>
                <Card.Body className='px-5'>
                  <Form style={{ width: '100%' }}>
                  <p>
                  <span style={{ fontWeight: 'semi-bold' }}>Images:</span>
                  <span> The first image will be the cover (max 6)</span>
                </p>
                  <div >
                    <div style={{ display: 'inline-block', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginRight: '2px',width:'65%' }}>
                        <input  onChange={(e)=>{
                          setFiles(e.target.files);
                        }} type='file' accept='image/*' multiple/>
                    </div>
                    <button className="btn btn-primary" style={{padding: '10px',width:'33%'}} onClick={handleImageSubmit}>UPLOAD</button>
                    </div>
                      <p>
                      {filePerc > 0 && filePerc < 100 && (
                        <span>Uploading ...</span>
                      ) }
                      </p>

                      {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                      <div key={url} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <img
                            src={url}
                            alt='listing image'
                            style={{ width: '100px', height: '100px', marginRight: '10px' }}
                          />
                          <button
                          
                            className="btn btn-danger btn-sm"
                            style={{ padding: '5px' }}
                            onClick={()=>handleRemoveImage(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className='w-100 btn btn-lg mt-4 ml-0 mb-4 mr-4'
                      style={{
                        backgroundColor: '#6ABE5D',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      CREATE LISTING
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
      {imageUploadError && (
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
        }}
      >
        {imageUploadError}
      </p>
    )}
    </div>
  );
};

export default CreateListing;
