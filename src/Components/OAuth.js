import React from 'react'
import {  Button } from 'react-bootstrap';
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../GoogleFirebase';
import { useDispatch } from 'react-redux';
import { signInSuccess} from '../Redux/user/UserSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    let navigate =useNavigate();
    const handleGoogleClick = async ()=>{
        try{
            const provider=new GoogleAuthProvider()
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);

            const res = await fetch('/api/google',{
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: result.user.displayName,email: result.user.email, photo: result.user.photoURL })
            })

            const data= await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        
        }catch(error){
            console.log('Could not sign in with google',error);
        }
    }
  return (
            <Button
                type='button'
                className='mb-4 w-100'
                size='lg'
                style={{
                  backgroundColor: 'rgb(185 ,28 ,28)',
                  color: 'white',
                }}
                onClick={handleGoogleClick}
                >
                CONTINUE WITH GOOGLE
            </Button>
  )
}

export default OAuth
