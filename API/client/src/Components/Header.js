import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './images/Sifter-Logo.png';
import { NavLink, Outlet } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<Navbar bg="light" expand="xs" className="fixed-top navbar-light">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						<Image src={logo} className="logo-image" />
					</NavLink>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Link className="nav-link" to="/search">
								Search
							</Link>
							<NavLink className="nav-link" to="/favorites">
								Popular
							</NavLink>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
			<Outlet />
		</div>
	);
};

export default Header;
