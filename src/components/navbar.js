import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
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
import BrandImage from "./ui/brand-image";

const NavbarComponent = () => {
	const renderRef = useRef(0);
	renderRef.current++;

	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const [showLogin, setShowLogin] = useState(false);
	const [showReg, setShowReg] = useState(false);
	const [showChangePwd, setShowChangePwd] = useState(false);
	const [showForgotPwd, setShowForgotPwd] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showMobileFlags, setShowMobileFlags] = useState(
		!window.matchMedia("(max-width: 1023px)").matches ? "" : "is-hidden"
	);
	const [defaultLanguage, setDefaultLanguage] = useState(() => {
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
				return FLAGS[language];
			}
		}
	});
	const { isLoading, err, sendRequest } = useFetch();

	useEffect(() => {
		const resize = () => {
			if (!window.matchMedia("(max-width: 1023px)").matches) {
				setShowMobileFlags("");
			} else {
				setShowMobileFlags(showMobileFlags === "" ? "" : "is-hidden");
			}
		};
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	const handleShowLogin = useCallback(() => {
		setShowLogin(!showLogin);
	}, [showLogin]);
	const handleShowReg = useCallback(() => {
		setShowReg(!showReg);
	}, [showReg]);
	const handleShowChangePwd = useCallback(() => {
		setShowChangePwd(!showChangePwd);
	}, [showChangePwd]);
	const handleShowForgotPwd = useCallback(() => {
		setShowForgotPwd(!showForgotPwd);
	}, [showForgotPwd]);
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
		<div className='columns column is-centered'>
			<p>{renderRef.current}</p>
			<nav className='navbar'>
				<div className='navbar-brand'>
					{NAVBAR.visible.map((button) => (
						<NavbarButtonComponent
							key={`navbar-${button.name}`}
							text={applanguage.navbar[button.name]}
							type={button.type}
							path={button.path}
							className={button.class}
							style={button.style}>
							{button.name === "home" ? <BrandImage /> : null}
						</NavbarButtonComponent>
					))}

					{!currentUser && (
						<React.Fragment>
							{NAVBAR.logOut.map((button) => (
								<NavbarButtonComponent
									key={button.name}
									text={applanguage.navbar[button.name]}
									type={button.type}
									className={button.class}
									style={button.style}
									onClick={showModal[button.name]}
								/>
							))}
						</React.Fragment>
					)}

					{currentUser && (
						<React.Fragment>
							{NAVBAR.logIn.map((button) => (
								<NavbarButtonComponent
									key={`navbar-${button.name}`}
									text={
										button.name === "profil"
											? currentUser
											: applanguage.navbar[button.name]
									}
									type={button.type}
									path={button.path}
									className={button.class}
									style={button.style}
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
							<div className='account-dropdown navbar-item has-dropdown is-hoverable has-text-centered'>
								<NavbarButtonComponent
									key={applanguage.navbar.account}
									text={applanguage.navbar.account}
									type='modal'
									className='navbar-link'
									onClick={handleShowMobileMenu}
								/>
								<div className='account-dropdown-list navbar-dropdown'>
									{NAVBAR.menu.map((button) => (
										<NavbarButtonComponent
											key={button.name}
											text={applanguage.navbar[button.name]}
											type={button.type}
											path={button.path}
											className={button.class}
											style={button.styleMenu}
											onClick={showModal[button.name]}
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
							<a className='navbar-link is-arrowless' onClick={handleShowMobileFlags}>
								<img src={defaultLanguage.flag}></img>
							</a>
							<div className={`navbar-dropdown is-boxed ${showMobileFlags}`}>
								{Object.keys(FLAGS).map((country) => (
									<a
										className='navbar-item'
										key={FLAGS[country].text}
										value={FLAGS[country].code}
										onClick={handleChangeLanguage}>
										<img src={FLAGS[country].flag} value={FLAGS[country].code}></img>
										<span value={FLAGS[country].code}>{FLAGS[country].text}</span>
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
