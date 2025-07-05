import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CustomNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

   return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <i className="bi bi-shop me-2"></i>Inviggo
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {user ? (
              <>
                <Nav.Item className="me-3">
                  <span className="text-muted">Welcome, <strong>{user.username}</strong></span>
                </Nav.Item>
                <Button 
                  as={Link} 
                  to="/create" 
                  variant="primary" 
                  className="me-2 rounded-pill px-3"
                >
                  <i className="bi bi-plus-lg me-1"></i> New Ad
                </Button>
                <Button 
                  onClick={() => { logout(); navigate('/login'); }}
                  variant="outline-danger" 
                  className="rounded-pill px-3"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary" 
                  className="me-2 rounded-pill px-3"
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  className="rounded-pill px-3"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;