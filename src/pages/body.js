import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext, OtherUserContext } from "../store/user-context";
import { Routes, Route } from "react-router-dom";

import HomePage from "./home_page/home_page";
import ScoreTablePage from "./score-table_page/score-table_page";
import BettingPage from "./betting_page/betting_page";
import UserCurrentPage from "./user-current_page/user-current_page";
import UserOtherPage from "./user-other_page/user-other_page";

const BodyComponent = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const currentUser = useContext(CurrentUserContext);
	const otherUser = useContext(OtherUserContext);

	return (
		<div className=''>
			<h3>Body render: {renderRef.current}</h3>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/table' element={<ScoreTablePage />} />
				<Route path='/bet' element={<BettingPage />} />
				<Route path='/profil' element={<UserCurrentPage />} />
				<Route path={otherUser.otherUserName} element={<ScoreTablePage />} />
			</Routes>
		</div>
	);
};

export default BodyComponent;
