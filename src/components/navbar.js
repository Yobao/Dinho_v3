import React, { useState, useEffect, useContext, useRef } from "react";
import useFetch from "../hooks/use-fetch";
import { Outlet, useLocation, Link } from "react-router-dom";
import * as TRANSLATIONS from "../store/translations";
import { CurrentUserContext, LanguageContext } from "../store/user-context";

import Brand from "../assets/brand.png";
import URL from "./../store/templates";

const NavbarComponent = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const currentUserContext = useContext(CurrentUserContext).currentUser;
	const currentUser = currentUserContext ? currentUserContext.user : null;
	const navbarText = useContext(LanguageContext).appLanguage.navbar;
	const [showLogin, setShowLogin] = useState(false);
	const [showReg, setShowReg] = useState(false);
	const [showChangePwd, setShowChangePwd] = useState(false);
	const [showForgotPwd, setShowForgotPwd] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(null);

	const handleShowLogin = () => {
		setShowLoginModal(!showLogin);
	};
	const handleShowReg = () => {
		setShowReg(!showReg);
	};
	const handleShowChangePwd = () => {
		setShowChangePwd(!showChangePwd);
	};
	const handleShowForgotPwd = () => {
		setShowForgotPwd(!showForgotPwd);
	};
	const handleShowMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu ? "is-active" : null);
	};

	return (
		<div className='columns column is-centered '>
			<nav className='navbar'>
				<div className='navbar-brand'>
					<Link
						to='/'
						className='navbar-item'
						style={{ paddingLeft: "8px", paddingRight: "8px" }}>
						<img
							src={Brand}
							style={{ maxHeight: "70px" }}
							height='69.98'
							width='76.75'></img>
					</Link>
					<Link
						to='/table'
						className='navbar-item'
						style={{ paddingLeft: "8px", paddingRight: "8px" }}>
						{navbarText.table}
					</Link>
					{!currentUser && (
						<React.Fragment>
							<a
								className='navbar-item'
								onClick={() => {}}
								style={{ paddingLeft: "8px", paddingRight: "8px" }}>
								{navbarText.login}
							</a>
							<a
								className='navbar-item'
								onClick={() => {}}
								style={{ paddingLeft: "8px", paddingRight: "8px" }}>
								{navbarText.registration}
							</a>
						</React.Fragment>
					)}
					{currentUser && (
						<React.Fragment>
							<Link
								to='/bet'
								className='navbar-item'
								style={{ paddingLeft: "8px", paddingRight: "8px" }}>
								{navbarText.bet}
							</Link>
							<Link
								to='/profil'
								className='navbar-item'
								style={{ paddingLeft: "8px", paddingRight: "8px" }}>
								{" "}
								{currentUser}
							</Link>
							<a
								role='button'
								className={`navbar-burger my-auto ${showMobileMenu}`}
								aria-label='menu'
								aria-expanded='false'
								data-target='navbarBasicExample'
								onClick={handleShowMobileMenu}>
								<span aria-hidden='true'></span>
								<span aria-hidden='true'></span>
								<span aria-hidden='true'></span>
							</a>
						</React.Fragment>
					)}
				</div>

				{currentUser && (
					<div className={`navbar-menu ${showMobileMenu}`}>
						<div className='navbar-start'>
							<div className='account-dropdown navbar-item has-dropdown is-hoverable has-text-centered'>
								<a className='navbar-link' onClick={handleShowMobileMenu}>
									{navbarText.account}
								</a>
								<div className='account-dropdown-list navbar-dropdown'>
									<a
										className='navbar-item'
										style={{ paddingLeft: "8px", paddingRight: "40px" }}>
										{navbarText.pwdchange}
									</a>
									<Link
										to='/'
										className='navbar-item'
										style={{ paddingLeft: "8px", paddingRight: "40px" }}>
										{navbarText.logout}
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
				<Outlet />
			</nav>
		</div>
	);
};

export default NavbarComponent;
