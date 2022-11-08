import React, { useContext, useRef } from "react";
import { OtherUserContext } from "../store/user-context";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./home_page/home_page";
import ScoreTablePage from "./score-table_page/score-table_page";
import BettingPage from "./betting_page/betting_page";
import UserCurrentPage from "./user-current_page/user-current_page";
import UserOtherPage from "./user-other_page/user-other_page";

const BodyComponent = () => {
	const { otherUser, setOtherUser } = useContext(OtherUserContext);

	return (
		<div className=''>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/table' element={<ScoreTablePage />} />
				<Route path='/bet' element={<BettingPage />} />
				<Route path='/profil' element={<UserCurrentPage />} />
				<Route path={`${otherUser}`} element={<UserOtherPage />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</div>
	);
};

export default BodyComponent;
