import React,{ useEffect, useState }  from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom';
import { Row,Col,Card,Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../Components/ListingItem';

const Home = () => {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/search/searchlistings?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/search/searchlistings?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/search/searchlistings?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <Header/>

      <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', // Vertical gap between elements
        padding: '28px', // Padding for the container
        paddingLeft: '0.75rem', // Horizontal padding
        paddingRight: '0.75rem', // Horizontal padding
        maxWidth: '1140px', // Maximum width
        marginLeft: 'auto', // Center horizontally
        marginRight: 'auto', // Center horizontally
      }}
    >
      <h1 style={{ color: '#374151', fontWeight: 'bold', fontSize: '3rem', '@media (min-width: 768px)': { fontSize: '3.75rem' } }}>
        Find your next <span style={{ color: '#6B7280' }}>perfect</span>
        <br />
        place with ease
      </h1>
      <div style={{ color: '#9CA3AF', fontSize: '1rem', marginBottom: '1rem', '@media (min-width: 640px)': { fontSize: '1rem' } }}>
        This is the best place to find your next perfect place to live.
        <br />
        We have a wide range of properties for you to choose from.
      </div>
      <Link to={'/search'} style={{ fontSize: '0.75rem', color: '#0056B3', fontWeight: 'bold', textDecoration: 'underline', transition: 'color 0.15s ease-in-out' }}>
        Let's get started...
      </Link>
    </Container>


    {/* swiper */}
    <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
                height: '500px', // Adjust the height as needed
              }}
            ></div>
          </SwiperSlide>
        ))}
    </Swiper>

    <Container className='max-w-6xl mx-auto p-3'>
      {offerListings && offerListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <Row className='flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <Col key={listing._id} xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <ListingItem listing={listing} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

{rentListings && rentListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
          </div>
          <Row className='flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <Col key={listing._id} xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <ListingItem listing={listing} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

{saleListings && saleListings.length > 0 && (
        <div>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
          </div>
          <Row className='flex-wrap gap-4'>
            {saleListings.map((listing) => (
              <Col key={listing._id} xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <ListingItem listing={listing} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

    </Container>
    </div>
  )
}

export default Home
