import React from 'react';
import '../bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand="lg" CollapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand >Proshop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
						<Nav >
							
							<LinkContainer to='/cart'>
								<Nav.Link> <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/login'>
								<Nav.Link ><i className="fa fa-user" aria-hidden="true"></i> Sign In</Nav.Link>
							</LinkContainer>

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;