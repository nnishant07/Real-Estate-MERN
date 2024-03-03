import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../Components/Contact';

const Listing = () => {
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const {currentUser} = useSelector((state)=>state.user);
  const [contact,setContact]=useState(false);
  
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        console.log(listingId);
        const res = await fetch(`/api/getlist/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div>
      <Header />
      {loading && <p className='text-center my-7' style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Loading...</p>}
      {error && <p className='text-center my-7 ' style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>Something went wrong...</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div className='swiper-slide-image' style={{ backgroundImage: `url(${url})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '350px', width: '100%' }}></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div style={{ position: 'absolute', top: '13%', right: '3%', zIndex: '10' }}>
            <div className="border rounded-full w-24 h-24 d-flex justify-content-center align-items-center bg-secondary cursor-pointer" style={{height:'30px',width:'30px'}}>
              <FaShare
                className='text-primary'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
          </div>
          {copied && (
            <p style={{ position: 'fixed', top: '23%', right: '5%', zIndex: '10', borderRadius: '0.375rem', backgroundColor: '#CBD5E0', padding: '0.5rem' }}>
              Link copied!
            </p>
          )}
          <div className='container mt-5'>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='d-flex align-items-center mt-3 gap-2 text-muted small'>
              <FaMapMarkerAlt className='text-success' />
              {listing.address}
            </p>
            <div className='d-flex gap-3 mt-3'>
              <p className='bg-danger text-white px-2 py-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-success text-white px-2 py-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
          </div>
          <div className='container '>
            <p className='text-muted font-weight-bold'>
              <span className='text-dark ' style={{ fontWeight: 'bold' }}>Description - </span>
              {listing.description}
            </p>
            <ul className='text-success d-flex flex-wrap gap-3 sm-gap-5' style={{fontWeight: 'bold',marginLeft: 0 }}>
              <li className='d-flex align-items-center gap-1'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='d-flex align-items-center gap-1'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='d-flex align-items-center gap-1'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='d-flex align-items-center gap-1'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (

              <button onClick={()=>setContact(true)}style={{textTransform: 'uppercase',padding: '10px',borderRadius: '5px',backgroundColor: '#444',color:'white',width:'100%',marginBottom: '15px'}}>
              Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;