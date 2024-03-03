import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord,setLandlord]=useState(null);
    const [message,setMessage]=useState('');
    
    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }
    useEffect(()=>{
        const fetchLandlord = async()=>{
            try{
                const res=await fetch(`/api/${listing.userRef}`)
                const data= await res.json();
                setLandlord(data);
                
            }catch(error){
                console.log(error);
            }
        }
        fetchLandlord();
    },[listing.userRef])
  return (
    <>
    {landlord && (
        <div style={{ width: '100%', marginBottom: '15px', marginTop: '15px' }}>
        {landlord && (
          <div>
            <p>
              Contact <span style={{ fontWeight: '600' }}>{landlord.name}</span> for{' '}
              <span style={{ fontWeight: '600' }}>{listing.name}</span>
            </p>
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChangeMessage}
              placeholder="Enter your Message here..."
              style={{
                width: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '10px',
              }}
            ></textarea>
            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              style={{
                textTransform: 'uppercase',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#444',
                color: 'white',
                width: '100%',
                marginBottom: '15px',
                marginTop: '15px',
                display: 'block',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Send Message
            </Link>
          </div>
        )}
      </div>
  
    )}
    </>
  )
}

export default Contact
