import React, { useState, useEffect, useContext, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { CurrentUserContext, LanguageContext } from "../store/user-context";
import { NAVBAR } from "./../store/templates";
import URL from "./../store/templates";

const NavbarComponent = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	return (
		<React.Fragment>
			<h1>Navbar</h1>
			<h3>Navbar render: {renderRef.current}</h3>
		</React.Fragment>
	);
};

export default NavbarComponent;
