import React, { useEffect, useState } from 'react';
import { Row,Col, Container, Card, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';


const Search = () => {
    const [sidebarData,setSidebarData]=useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort_order: 'created_at',
        order: 'desc',
    });

    const navigate = useNavigate();
    const handleChange = (e) =>{

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebarData({...sidebarData,type: e.target.id});
        }
        
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData,searchTerm: e.target.value});
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebarData({...sidebarData,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
        }
        
        if(e.target.id === 'sort_order'){

            const sort = e.target.value.split('_')[0] || 'created_at'

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebarData({...sidebarData,sort,order});
        }
        
    }

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`); 
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSidebarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }   
        
        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/search/searchlistings?${searchQuery}`);
            const data = await res.json();

            if (data.length > 8) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setListings(data);
            setLoading(false);
          };
      
          fetchListings();
      }, [window.location.search]);
  return (
    <div>
    <Header />
    <Container>
      <Row>
      <Col md={6} lg={6}>
        <Container fluid className='d-flex align-items-center justify-content-center'>
            <div className='mask gradient-custom-3'></div>
            <Card className='m-2' style={{ maxWidth: '1000px', minWidth: '400px', border: 'none' }}>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                <FormGroup className="row align-items-center mb-4">
                    <FormLabel className="col-auto mb-0" style={{ fontWeight: '600' }}>Search Term:</FormLabel>
                    <div className="col">
                    <FormControl type="text" placeholder="Search..." id='searchTerm' value={sidebarData.searchTerm} onChange={handleChange}/>
                    </div>
                </FormGroup>
                <FormGroup className="row align-items-center mb-4">
                    <FormLabel className="col-auto mb-0" style={{ fontWeight: '600' }}>Type:</FormLabel>
                    <div className="col">
                    <FormGroup className="row m-0">
                        <Form.Check className="col-auto" type="checkbox" label="Rent & Sale" id='all' onChange={handleChange} checked={sidebarData.type === 'all'} />
                        <Form.Check className="col-auto" type="checkbox" label="Rent" id='rent' onChange={handleChange} checked={sidebarData.type === 'rent'} />
                        <Form.Check className="col-auto" type="checkbox" label="Sale" id='sale' onChange={handleChange} checked={sidebarData.type === 'sale'}/>
                        <Form.Check className="col-auto" type="checkbox" label="Offer" id='offer' onChange={handleChange} checked={sidebarData.offer}/>
                    </FormGroup>
                    </div>
                </FormGroup>
                <FormGroup className="row align-items-center mb-4">
                    <FormLabel className="col-auto mb-0" style={{ fontWeight: '600' }}>Amenities:</FormLabel>
                    <div className="col">
                    <FormGroup className="row m-0">
                        <Form.Check className="col-auto" type="checkbox" label="Parking" id='parking' onChange={handleChange} checked={sidebarData.parking} />
                        <Form.Check className="col-auto" type="checkbox" label="Furnished" id='furnished' onChange={handleChange} checked={sidebarData.furnished}/>
                    </FormGroup>
                    </div>
                </FormGroup>
                <FormGroup className="row align-items-center mb-4">
                    <FormLabel className="col-auto mb-0" style={{ fontWeight: '600' }}>Sort:</FormLabel>
                    <div className="col">
                    <FormControl as="select" onChange={handleChange} id='sort_order' defaultValue={'created_at_desc'}>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </FormControl>
                    </div>
                </FormGroup>
                <FormGroup className="row align-items-center mb-4">
                    <div className="col">
                    <Button variant="primary" style={{ width: '100%' }} onClick={handleSubmit}>Search</Button>
                    </div>
                </FormGroup>
                </Form>
            </Card.Body>
            </Card>
        </Container>
        </Col>
        <Col md={6} lg={6} className='flex-1'>
      <Container className="mb-4">
        <h2 className='m-4' style={{ fontWeight: '600' }}>Listing results:</h2>
        <div className='d-flex flex-wrap gap-4' style={{ paddingTop: '1.5rem', paddingRight: '1.5rem', paddingLeft: '1.5rem' }}>
          {loading && (
            <p className='text-xl text-slate-700'>Loading...</p>
          )}

          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </Container>
    </Col>
      </Row>
    </Container>
    
  </div>
  )
}

export default Search
