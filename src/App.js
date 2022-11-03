import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bulma/css/bulma.css";
//import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.css";
import BodyComponent from "./pages/body";
import NavbarComponent from "./components/navbar";
import HomePage from "./pages/home_page/home_page";
import ScoreTablePage from "./pages/score-table_page/score-table_page";
import BettingPage from "./pages/betting_page/betting_page";
import UserCurrentPage from "./pages/user-current_page/user-current_page";
import UserOtherPage from "./pages/user-other_page/user-other_page";

import useFetch from "./hooks/use-fetch";
import {
	CurrentUserContext,
	OtherUserContext,
	DropdownTitleContext,
	LanguageContext,
} from "./store/user-context";
import * as TRANSLATIONS from "./store/translations";
import { LANGUAGES, URL } from "./store/data";

const App = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	if (!localStorage.getItem("dinholanguage"))
		localStorage.setItem("dinholanguage", window.navigator.language.toLowerCase());
	const [applanguage, setApplanguage] = useState(() => {
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
				return TRANSLATIONS[language];
			}
		}
		return TRANSLATIONS["CZECH"];
	});
	const [currentUser, setCurrentUser] = useState(null);
	const [otherUser, setOtherUser] = useState({ otherUserName: null, otherUserId: null });
	const [title, setTitle] = useState(null);
	const token = localStorage.getItem("dinhotoken");
	const { isLoading, error, sendRequest, isAuth } = useFetch();

	const requestConfig = {
		url: URL + "/autologin",
		requestOptions: {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	};

	useEffect(() => {
		const transformData = (data) => {
			setCurrentUser(data.user);
		};
		sendRequest(requestConfig, transformData);
	}, []);

	return (
		<LanguageContext.Provider value={{ applanguage, setApplanguage }}>
			<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
				<OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
					<DropdownTitleContext.Provider value={{ title, setTitle }}>
						{isAuth && (
							<div className='App'>
								<NavbarComponent />

								{<BodyComponent />}

								{/* 								<div className='columns is-centered'>
									<h3>Body render: {renderRef.current}</h3>
									<Routes>
										<Route path='/' element={<HomePage />} />
										<Route path='/table' element={<ScoreTablePage />} />
										<Route path='/bet' element={<BettingPage />} />
										<Route path='/profil' element={<UserCurrentPage />} />
										<Route path={otherUser.otherUserName} element={<ScoreTablePage />} />
										<Route path='*' element={<Navigate to='/' replace />} />
									</Routes>
								</div> */}
							</div>
						)}
					</DropdownTitleContext.Provider>
				</OtherUserContext.Provider>
			</CurrentUserContext.Provider>
		</LanguageContext.Provider>
	);
};

export default App;
