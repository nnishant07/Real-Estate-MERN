import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signInSuccess} from '../Redux/user/UserSlice';
import OAuth from '../Components/OAuth';

const Signin = () => {
  const [info, setInfo] = useState({  
    email: "",
    password: "",
  });
  
  const {loading,error}= useSelector((state)=>state.user);

  const dispatch = useDispatch();
  let navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...info })
      });
      const json = await response.json();
  
      if (json.success === false){
        dispatch(signInFailure(json.message));
      } else {
        dispatch(signInSuccess(json));
        navigate('/');
        console.log(json);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            <h2 className="text-uppercase text-center mb-5">SignIn</h2>
            <Form style={{ width: '100%' }}>
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
                {loading ? 'Loading...' : 'SIGN IN'}
              </Button>
              <OAuth/>
            </Form>

            <p className="text-center mb-0">
              Dont Have an Account? <Link to="/signup" style={{ color: 'blue' }}>Sign Up</Link>
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

export default Signin;
