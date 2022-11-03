import React from "react";
import { Link } from "react-router-dom";

const NavbarButtonComponent = ({ children, path, type, text, ...props }) => {
	const button =
		type === "link" ? (
			<Link to={path} {...props}>
				{!children ? text : children}
			</Link>
		) : (
			<a {...props}>{text}</a>
		);

	return <React.Fragment>{button}</React.Fragment>;
};

export default React.memo(NavbarButtonComponent);
