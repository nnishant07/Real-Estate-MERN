import React from 'react';
import {Link} from 'react-router-dom'
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import Header from '../Components/Header';

const CreateListing = () => {
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
                        <input type='file' accept='image/*' multiple/>
                    </div>
                    <button className="btn btn-primary" style={{padding: '10px',width:'30%'}}>UPLOAD</button>
                    </div>

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
    </div>
  );
};

export default CreateListing;
