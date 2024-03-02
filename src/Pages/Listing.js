import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use(Navigation);
    const [listing,setListing] = useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const params = useParams();
    useEffect(()=>{
        const fetchListing = async()=>{
            try{
                setLoading(true);
                const listingId = params.listingId;
                console.log(listingId);
                const res= await fetch(`/api/getlist/${listingId}`);
                const data=await res.json();
                
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setError(false);
                setLoading(false);
                console.log(data);
                
            }catch(error){
                setError(true);
                setLoading(false);
            }
            
        }
        fetchListing();
      },[params.listingId]);
  return (
    <div>
      <Header />
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p> }
      {error && <p className='text-center my-7 text-2xl'>Something went wrong...</p>}
      {listing && !loading && !error && (
  <div>
    <Swiper navigation>
      {listing.imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <div className='swiper-slide-image' style={{ backgroundImage: `url(${url})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '350px' }}></div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

    </div>
  )
}

export default Listing
