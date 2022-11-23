import React, { useState, useContext, useEffect, useMemo } from "react";
import useFetch from "../hooks/use-fetch";
import { Outlet, useLocation } from "react-router-dom";
import * as TRANSLATIONS from "../store/translations";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import { NAVBAR, FLAGS } from "./../store/templates";
import { URL, LANGUAGES } from "./../store/data";
import NavbarButtonComponent from "./ui/navbar-button";
import LoginModal from "../modals/login-modal";
import RegModal from "../modals/registration-modal";
import ChangePwdModal from "../modals/changepwd-modal";
import ForgotPwdModal from "../modals/forgotpwd-modal";

import BrandImage from "../components/ui/brand-image";

const NavbarComponent = () => {
	const location = useLocation();
	const checkResolution = window.matchMedia("(max-width: 1023px)").matches;
	const checkBrandResolution = window.matchMedia("(max-width: 768px)").matches;
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const { applanguage, setApplanguage } = useContext(LanguageContext);

	const [showLogin, setShowLogin] = useState(false);
	const [showReg, setShowReg] = useState(false);
	const [showChangePwd, setShowChangePwd] = useState(false);
	const [showForgotPwd, setShowForgotPwd] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showMobileFlags, setShowMobileFlags] = useState(
		!checkResolution ? "" : "is-hidden"
	);
	const [navbarEndWidth, setNavbarEndWidth] = useState(
		!checkResolution ? { width: "140px" } : {}
	);
	const brandSmall = { height: "70", width: "76.75" };
	const brandBig = { height: "90", width: "98.7" };
	const brandSize = useMemo(
		() => () => {
			return window.matchMedia("(max-width: 768px)").matches ? brandSmall : brandBig;
		},
		[checkBrandResolution]
	);
	const [brandImage, setBrandImage] = useState(brandSize);

	const [defaultLanguage, setDefaultLanguage] = useState(() => {
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
				return FLAGS[language];
			}
		}
	});
	const { isLoading, err, sendRequest } = useFetch();

	useEffect(() => {
		let resizeTimeout = null;
		const resize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				setShowMobileFlags(
					!window.matchMedia("(max-width: 1023px)").matches ? "" : "is-hidden"
				);
				setNavbarEndWidth(
					!window.matchMedia("(max-width: 1023px)").matches ? { width: "140px" } : {}
				);

				setBrandImage(brandSize);
			}, 150);
		};
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, [location, checkBrandResolution]);

	const handleShowLogin = () => {
		setShowLogin(!showLogin);
	};
	const handleShowReg = () => {
		setShowReg(!showReg);
	};
	const handleShowChangePwd = () => {
		setShowChangePwd(!showChangePwd);
	};
	const handleShowForgotPwd = () => {
		console.log("CLOSE ME!");
		setShowForgotPwd(!showForgotPwd);
	};
	const handleShowMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu ? "is-active" : null);
	};
	const handleShowMobileFlags = () => {
		if (window.matchMedia("(max-width: 1023px)").matches) {
			setShowMobileFlags(showMobileFlags === "" ? "is-hidden" : "");
		}
	};
	const handleChangeLanguage = (e) => {
		let languageKey = e.target.getAttribute("value");
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(languageKey)) {
				setDefaultLanguage(FLAGS[language]);
				localStorage.setItem("dinholanguage", languageKey);
				setApplanguage(TRANSLATIONS[language]);
				handleShowMobileFlags();
			}
		}
	};

	const requestConfig = {
		url: URL + "/logout",
		requestOptions: {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("dinhotoken")}`,
			},
		},
	};

	const logOut = () => {
		sendRequest(requestConfig);
		setCurrentUser(null);
		localStorage.removeItem("dinhotoken");
		handleShowMobileMenu();
	};

	const showModal = {
		login: handleShowLogin,
		registration: handleShowReg,
		pwdchange: handleShowChangePwd,
		logout: logOut,
	};

	return (
		<div className='columns my-3 mx-0 is-centered is-mobile'>
			<nav className='navbar'>
				<div className='navbar-brand'>
					{NAVBAR.visible.map(({ name, ...button }) => (
						<NavbarButtonComponent
							key={`navbar-${name}`}
							text={applanguage.navbar[name]}
							{...button}>
							{name === "home" ? <BrandImage style={brandImage} /> : null}
						</NavbarButtonComponent>
					))}
					{!currentUser && (
						<React.Fragment>
							{NAVBAR.logOut.map(({ name, ...button }) => (
								<NavbarButtonComponent
									key={`navbar-${name}`}
									text={applanguage.navbar[name]}
									{...button}
									onClick={showModal[name]}
								/>
							))}
						</React.Fragment>
					)}

					{currentUser && (
						<React.Fragment>
							{NAVBAR.logIn.map(({ name, ...button }) => (
								<NavbarButtonComponent
									key={`navbar-${name}`}
									text={name === "profil" ? currentUser.user : applanguage.navbar[name]}
									{...button}
								/>
							))}
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
							<div className='account-dropdown navbar-item has-dropdown is-hoverable has-text-centered is-mobile is-size-5-desktop'>
								<NavbarButtonComponent
									key={applanguage.navbar.account}
									text={applanguage.navbar.account}
									type='modal'
									className='navbar-link'
									onClick={handleShowMobileMenu}
								/>
								<div className='account-dropdown-list navbar-dropdown'>
									{NAVBAR.menu.map(({ name, ...button }) => (
										<NavbarButtonComponent
											key={`navbar-${name}`}
											text={applanguage.navbar[name]}
											{...button}
											onClick={showModal[name]}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{useLocation().pathname === "/" && (
					<div className='navbar-end'>
						<div className='navbar-item has-dropdown is-hoverable lang-dropdown'>
							<a
								className='navbar-link is-arrowless has-text-centered'
								onClick={handleShowMobileFlags}>
								<img src={defaultLanguage.flag}></img>
							</a>
							<div
								className={`navbar-dropdown is-boxed ${showMobileFlags} custom-navbar-end`}
								style={navbarEndWidth}>
								{Object.keys(FLAGS).map((country) => (
									<a
										className='navbar-item'
										key={FLAGS[country].text}
										value={FLAGS[country].code}
										onClick={handleChangeLanguage}>
										<div className='columns is-mobile has-text-centered'>
											<div className='column is-mobile has-text-right px-0'>
												<img src={FLAGS[country].flag} value={FLAGS[country].code} />
											</div>
											<div className='column is-mobile has-text-left px-0'>
												<span value={FLAGS[country].code}>
													&nbsp;&nbsp;{`${FLAGS[country].text}`}
												</span>
											</div>
										</div>
									</a>
								))}
								<hr className='navbar-divider'></hr>
							</div>
						</div>
					</div>
				)}
				<Outlet />
			</nav>

			{showLogin && (
				<LoginModal showModal={handleShowLogin} showAnotherModal={handleShowForgotPwd} />
			)}
			{showReg && <RegModal showModal={handleShowReg} />}
			{showChangePwd && <ChangePwdModal showModal={handleShowChangePwd} />}
			{showForgotPwd && <ForgotPwdModal showModal={handleShowForgotPwd} />}
		</div>
	);
};

export default NavbarComponent;
