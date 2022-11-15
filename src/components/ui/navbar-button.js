import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavbarButtonComponent = ({ children, path, type, text, ...props }) => {
	const resolvedPath = useResolvedPath(path);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	const buttonClass = `navbar-item is-mobile ${
		isActive
			? "has-text-link has-text-weight-medium custom-navbar-active"
			: "is-size-5-tablet"
	}`;

	const button =
		type === "link" ? (
			<Link
				to={path}
				{...props}
				className={!props.className && path !== "/" ? buttonClass : props.className}>
				{!children ? text : children}
			</Link>
		) : (
			<a
				{...props}
				className={!props.className && path !== "/" ? buttonClass : props.className}>
				{text}
			</a>
		);

	return <React.Fragment>{button}</React.Fragment>;
};

export default NavbarButtonComponent;
