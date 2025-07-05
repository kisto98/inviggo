import { Card, Button, Badge, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdvertisementById, deleteAdvertisement } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash, FaArrowLeft, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

function AdvertisementDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAdvertisementById(id);
        setAd(response.data);
      } catch (err) {
        setError('Failed to load advertisement');
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await deleteAdvertisement(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete advertisement');
      }
    }
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );
  
  if (error) return (
    <Container>
      <Alert variant="danger" className="mt-4">{error}</Alert>
    </Container>
  );
  
  if (!ad) return (
    <Container>
      <Alert variant="warning" className="mt-4">Advertisement not found</Alert>
    </Container>
  );

  return (
    <Container className="my-5">
      <Button 
        variant="outline-primary" 
        onClick={() => navigate(-1)} 
        className="mb-4 d-flex align-items-center gap-2"
      >
        <FaArrowLeft /> Back to listings
      </Button>
      
      <Card className="border-0 shadow-lg overflow-hidden">
        <Row className="g-0">
          <Col md={6}>
            <div className="h-100 d-flex align-items-center bg-light">
              <Card.Img 
                variant="top" 
                src={ad.imageUrl || 'https://via.placeholder.com/800x400'} 
                className="img-fluid rounded-start"
                style={{ objectFit: 'cover', maxHeight: '600px' }}
              />
            </div>
          </Col>
          <Col md={6}>
            <Card.Body className="p-4 p-lg-5">
              <Badge bg="primary" className="mb-3">{ad.category}</Badge>
              <Card.Title as="h1" className="mb-3 fw-bold">{ad.title}</Card.Title>
              
              <div className="d-flex align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">{parseFloat(ad.price).toFixed(2)} €</h3>
              </div>
              
              <Card.Text className="text-muted mb-4">{ad.description}</Card.Text>
              
              <div className="border-top border-bottom py-3 mb-4">
                <div className="d-flex align-items-center mb-2">
                  <FaMapMarkerAlt className="me-2 text-muted" />
                  <span>{ad.city}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaCalendarAlt className="me-2 text-muted" />
                  <span>Posted: {new Date(ad.postingDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaUser className="me-2 text-muted" />
                  <span>Seller: {ad.username}</span>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <FaPhone className="me-2 text-muted" />
                  <a href={`tel:${ad.userPhone}`} className="text-decoration-none">
                    {ad.userPhone}
                  </a>
                </div>
              </div>
              
              {user?.id === ad.userId && (
                <div className="d-flex gap-3 mt-4">
                  <Button 
                    as={Link} 
                    to={`/edit/${ad.id}`} 
                    variant="outline-primary" 
                    className="d-flex align-items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={handleDelete}
                    className="d-flex align-items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AdvertisementDetail;