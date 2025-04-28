import { Navbar, Nav, Image } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function TopBar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    document.querySelector('.sidebar').classList.toggle('active');
  };

  return (
    <Navbar bg="light" expand="lg" className="top-bar">
      <Nav>
        <Nav.Link onClick={toggleSidebar} className="d-lg-none me-3">
          <i className="fas fa-bars fa-lg"></i>
        </Nav.Link>
      </Nav>
      <Navbar.Brand className="fw-bold text-danger">
        TopCV
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link
          className={location.pathname === '/analytics' ? 'active' : ''}
        >
          Analytics
        </Nav.Link>

      </Nav>
      <Nav>
        <Nav.Link>
          <Image
            src="https://via.placeholder.com/32"
            roundedCircle
            style={{ width: '32px', height: '32px' }}
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TopBar;