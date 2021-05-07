import React from 'react';
import '../bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand="lg" CollapseOnSelect>
				<Container>
					<Navbar.Brand href="/">Proshop</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						<Nav >
							<Nav.Link href="/cart"> <i className="fa fa-shopping-cart"  aria-hidden="true"></i> Cart</Nav.Link>
							<Nav.Link href="/login"><i className="fa fa-user"  aria-hidden="true"></i> Sign In</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;