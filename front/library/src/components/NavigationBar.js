import userEvent from '@testing-library/user-event';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next'

function NavigationBar(props) {
  const { t, i18n } = useTranslation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{t('header.application')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title={props.userName} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={props.onLogOut}>Log-Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;