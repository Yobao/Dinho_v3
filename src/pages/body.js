import React, { useState, useEffect, useContext, useRef } from "react";
import ScoreTablePage from "./score-table_page/score-table_page";
import { CurrentUserContext } from "../store/user-context";

const BodyComponent = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const currentUser = useContext(CurrentUserContext);

	return (
		<React.Fragment>
			<h1>Body</h1>
			<h3>Body render: {renderRef.current}</h3>
			<ScoreTablePage />
		</React.Fragment>
	);
};

export default BodyComponent;
