import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const Signup = () => {
  const [info, setInfo] = useState({  
    name: "",
    email: "",
    password: "",
  });
  const [error,setError]= useState(null);
  const [loading,setLoading] = useState(false);

  let navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...info })
      });
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        setError(json.message);
        setLoading(false);
      } else {
        setError(null);
        setLoading(false);
        navigate('/signin');
      }
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <Header />
      <Container fluid className='d-flex align-items-center justify-content-center'>
        <div className='mask gradient-custom-3'></div>
        <Card className='m-5' style={{ maxWidth: '600px', border: 'none' }}>
          <Card.Body className='px-5'>
            <h2 className="text-uppercase text-center mb-5">SignUp</h2>
            <Form style={{ width: '100%' }}>
              <Form.Group className='mb-4'>
                <Form.Control type='text' placeholder='Your Name' size='lg' name='name' value={info.name} onChange={onChange}/>
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='email' placeholder='Your Email' size='lg' name='email' value={info.email} onChange={onChange}/>
              </Form.Group>
              <Form.Group className='mb-4'>
                <Form.Control type='password' placeholder='Password' size='lg' name='password' value={info.password} onChange={onChange}/>
              </Form.Group>
              <Button
                className='mb-4 w-100'
                size='lg'
                style={{
                  backgroundColor: 'rgb(51,65,85)',
                  color: 'white',
                  borderColor: 'rgb(51,65,85)',
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </Button>
            </Form>

            <p className="text-center mb-0">
              Have an Account? <Link to="/signin" style={{ color: 'blue' }}>Sign In</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
      {error && (
      <p
        className='text-red-500'
        style={{
          position: 'absolute',
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
        {error}
      </p>
    )}
    </div>
  )
}

export default Signup;
