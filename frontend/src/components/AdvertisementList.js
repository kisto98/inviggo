import { Card, Button, Row, Col, Form, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useAuth } from '../context/AuthContext';

function AdvertisementList({ 
  ads, 
  onDelete, 
  currentPage, 
  totalPages, 
  onPageChange,
  filters,
  onFilterChange,
  user 
}) {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    onFilterChange(newFilters);
  };
  return (
    <div className="py-4">
      {/* Filter Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form>
            <Row className="g-3 align-items-center">
              <Col md={4}>
                <Form.Control
                  type="search"
                  name="searchQuery"
                  placeholder="Search ads..."
                  value={filters.searchQuery || ''}
                  onChange={handleInputChange}
                  className="rounded-pill"
                />
              </Col>
              
              <Col md={2}>
                <Form.Select 
                  name="category"
                  value={filters.category || ''}
                  onChange={handleInputChange}
                  className="rounded-pill"
                >
                  <option value="">All Categories</option>
                  <option value="CLOTHING">Clothing</option>
                  <option value="TOOLS">Tools</option>
                  <option value="SPORTS">Sports</option>
                  <option value="ACCESSORIES">Accessories</option>
                  <option value="FURNITURE">Furniture</option>
                  <option value="PETS">Pets</option>
                  <option value="GAMES">Games</option>
                  <option value="BOOKS">Books</option>
                  <option value="TECHNOLOGY">Technology</option>
                </Form.Select>
              </Col>
              
              <Col md={2}>
                <Form.Control
                  type="number"
                  name="minPrice"
                  placeholder="Min price"
                  value={filters.minPrice || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="rounded-pill"
                />
              </Col>
              
              <Col md={2}>
                <Form.Control
                  type="number"
                  name="maxPrice"
                  placeholder="Max price"
                  value={filters.maxPrice || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="rounded-pill"
                />
              </Col>
              
              {user && (
                <Col md={2} className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    id="showMine"
                    label="My ads only"
                    name="showMine"
                    checked={filters.showMine || false}
                    onChange={handleInputChange}
                    className="ms-2"
                  />
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Advertisements Grid */}
      {ads.length === 0 ? (
        <div className="text-center py-5">
          <img 
            src="https://placehold.co/300x200?text=No+Results" 
            alt="No ads found" 
            className="img-fluid mb-4 opacity-75"
            style={{ maxWidth: '300px' }}
          />
          <h4 className="mb-3">No advertisements found</h4>
          <p className="text-muted mb-4">
            Try adjusting your search filters {user ? "or create a new listing" : ""}
          </p>
          {user && (
            <Button 
              as={Link} 
              to="/create" 
              variant="primary" 
              className="rounded-pill px-4"
            >
              <i className="bi bi-plus-circle me-2"></i> Create New Ad
            </Button>
          )}
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {ads.map(ad => (
              <Col key={ad.id}>
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={ad.imageUrl || 'https://placehold.co/600x400?text=No+Image'} 
                      className="card-img-top"
                      style={{ 
                        height: '200px', 
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem'
                      }}
                    />
                    <Badge 
                      bg="secondary" 
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {ad.category}
                    </Badge>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{ad.title}</Card.Title>
                    <Card.Text className="d-flex flex-column mb-3">
                      <span className="fw-bold fs-5 text-primary">
                        {parseFloat(ad.price).toFixed(2)} €
                      </span>
                      <span className="text-muted small">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {ad.city}
                      </span>
                    </Card.Text>
                    
                    <Card.Text className="text-muted small flex-grow-1">
                      {ad.description.length > 100 
                        ? `${ad.description.substring(0, 100)}...` 
                        : ad.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between mt-3">
                      <Button 
                        as={Link} 
                        to={`/ads/${ad.id}`} 
                        variant="outline-primary" 
                        size="sm"
                        className="rounded-pill px-3"
                      >
                        <i className="bi bi-eye me-1"></i> View
                      </Button>
                      
                      {user?.id === ad.userId && (
                        <div className="btn-group">
                          <Button 
                            as={Link} 
                            to={`/edit/${ad.id}`}
                            variant="outline-secondary" 
                            size="sm"
                            className="rounded-pill px-3"
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </Button>
                          <Button 
                            onClick={() => onDelete(ad.id)}
                            variant="outline-danger" 
                            size="sm"
                            className="rounded-pill px-3"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                  
                  <Card.Footer className="bg-transparent border-top-0 pt-0">
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      Posted {new Date(ad.postingDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).replace(/\//g, '.')}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-5">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdvertisementList;