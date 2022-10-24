import React, { useContext } from "react";
import { Link } from "react-router-dom";

const NavbarButtonComponent = (props) => {
	const button =
		props.type === "link" ? (
			<Link to={props.path} className={props.class} style={props.style}>
				{!props.children ? props.text : props.children}
			</Link>
		) : (
			<a className={props.class} style={props.style} onClick={props.click}>
				{props.text}
			</a>
		);

	return <React.Fragment>{button}</React.Fragment>;
};

export default NavbarButtonComponent;
