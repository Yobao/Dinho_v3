import React, { useState, useEffect, useContext, useRef } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import * as TRANSLATIONS from "../store/translations";
import { CurrentUserContext, LanguageContext } from "../store/user-context";

import Brand from "../assets/brand.png";
import URL from "./../store/templates";

const NavbarComponent = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const currentUser = useContext(CurrentUserContext).currentUser.user;
	const navbarText = useContext(LanguageContext).appLanguage.navbar;

	return (
		<React.Fragment>
			<nav className='navbar'>
				<div className='navbar-brand'>
					<Link to='/' className='navbar-item'>
						<img src={Brand} style={{ maxHeight: "90px" }} height='90' width='99'></img>
					</Link>
					<Link to='/table' className='navbar-item has-text-danger'>
						{navbarText.table}
					</Link>
					{!currentUser && (
						<React.Fragment>
							<a className='navbar-item' onClick={() => {}}>
								{navbarText.login}
							</a>
							<a className='navbar-item' onClick={() => {}}>
								{navbarText.registration}
							</a>
						</React.Fragment>
					)}
					{currentUser && (
						<React.Fragment>
							<Link to='/bet' className='navbar-item'>
								{navbarText.bet}
							</Link>
							<Link to='/profil' className='navbar-item'>
								{" "}
								{currentUser}
							</Link>
						</React.Fragment>
					)}
					<a
						role='button'
						className={`navbar-burger`}
						aria-label='menu'
						aria-expanded='false'
						data-target='navbarBasicExample'
						onClick={() => {}}>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
					</a>
				</div>

				{currentUser && (
					<div className='navbar-menu'>
						<div className='navbar-start'>
							<div className='account-dropdown navbar-item has-dropdown is-hoverable '>
								<a className='navbar-link' onClick={() => {}}>
									{navbarText.account}
								</a>
								<div className='account-dropdown-list navbar-dropdown'>
									<a className='navbar-item'>{navbarText.pwdchange}</a>
									<Link to='/' className='navbar-item'>
										{navbarText.logout}
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
				<Outlet />
			</nav>
		</React.Fragment>
	);
};

export default NavbarComponent;
