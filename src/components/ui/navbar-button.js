import React, { useContext } from "react";

const NavbarButtonComponent = (props) => {
	return (
		<React.Fragment>
			<h1 className={props.class} onClick={props.click}>
				{props.text}
			</h1>
		</React.Fragment>
	);
};

export default NavbarButtonComponent;
