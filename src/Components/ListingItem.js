import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingItem = ({ listing }) => {
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  const cardStyle = {
    backgroundColor: '#fff',
    boxShadow: isHovered ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.3s ease',
    overflow: 'hidden',
    borderRadius: '0.375rem'
  };

  const textStyle = {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500'
  };

  const nameStyle = {
    color: '#000', // Black color
    fontSize: '18px', // Larger font size
    fontWeight: 'bold' // Bold font weight
  };

  const priceStyle = {
    ...textStyle,
    color: '#64748b', // Slate color
    fontWeight: 'bold', // Bold font weight
    fontSize: '14px' // Font size
  };

  const infoStyle = {
    color: '#000', // Black color
    fontWeight: 'bold', // Bold font weight
    fontSize: '14px' // Smaller font size
  };

  return (
    <Card style={cardStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link to={`/listing/${listing._id}`} className="text-decoration-none text-reset">
        <Card.Img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='w-full object-cover img-fluid'
          style={{ height: '320px', minWidth: '400px' }} // Adjust height as needed
        />
        <Card.Body className='p-3'>
          <Card.Title className='text-lg font-semibold text-truncate' style={{ ...textStyle, maxWidth: '100%' }}>
            <span style={nameStyle}>{listing.name}</span>
          </Card.Title>
          <Row className='align-items-center mb-2'>
            <Col xs='auto'>
              <MdLocationOn className='h-4 w-4 text-green-700' />
            </Col>
            <Col>
              <Card.Text className='text-sm text-gray-600'>
                {listing.address}
              </Card.Text>
            </Col>
          </Row>
          <Card.Text className='text-sm text-gray-600 mb-2' style={{ ...textStyle, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
            {listing.description}
          </Card.Text>
          <Card.Text style={priceStyle}>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </Card.Text>
          <div style={{ ...textStyle, display: 'flex', gap: '4px' }}>
            <div style={infoStyle}>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div style={infoStyle}>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ListingItem;
