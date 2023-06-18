import userEvent from '@testing-library/user-event';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next'
import { ReactComponent as LogoSmall } from '../images/logo_small.svg';
import EditKnowtypeForm from '../forms/Workarea/KnowTypes/EditKnowtypeForm';

function NavigationBar(props) {
  const { t, i18n } = useTranslation();

  return (
    <Navbar className="main-header" expand="lg" bg="primary" data-bs-theme="dark" >
      <Navbar.Brand title="YouknoW" href="/" className="d-block logo_small"><LogoSmall /></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse className='justify-content-end'>
        {props.knowtype &&
          <Nav className="m-auto">
            <EditKnowtypeForm knowtype={props.knowtype} />
          </Nav>
        }
        <Nav>
          <NavDropdown className='dropdown-left' title={props.userName} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={props.onLogOut}>Log-Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <span></span>
      </Navbar.Collapse>
    </Navbar>


  );
}

export default NavigationBar;