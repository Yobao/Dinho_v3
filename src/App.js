import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//import "bulma/css/bulma.css";
import "./App.scss";
//import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.css";
import BodyComponent from "./pages/body";
import NavbarComponent from "./components/navbar";

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
	const location = window.location.pathname;
	const urlPreCheck = Number(
		location.slice(
			location.split("/", 2).join("/").length + 1,
			location.split("/", 3).join("/").length
		)
	);

	if (!localStorage.getItem("dinholanguage"))
		localStorage.setItem("dinholanguage", window.navigator.language.toLowerCase());
	const token = localStorage.getItem("dinhotoken");

	const [currentUser, setCurrentUser] = useState(null);
	const [otherUser, setOtherUser] = useState(
		!Number.isNaN(urlPreCheck) && urlPreCheck !== 0 ? location : null
	);
	const [dropdownTitle, setDropdownTitle] = useState(null);
	const [applanguage, setApplanguage] = useState(() => {
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
				return TRANSLATIONS[language];
			}
		}
		return TRANSLATIONS["CZECH"];
	});

	const { isLoading, error, sendRequest, isAuth } = useFetch();
	const options = { method: "GET", token };

	useEffect(() => {
		const transformData = (data) => {
			setCurrentUser(data);
		};
		sendRequest("/autologin", options, transformData);
	}, []);

	return (
		<LanguageContext.Provider value={{ applanguage, setApplanguage }}>
			<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
				<OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
					<DropdownTitleContext.Provider value={{ dropdownTitle, setDropdownTitle }}>
						<Routes>
							<Route
								path='/*'
								element={
									isAuth && (
										<div className='App'>
											<NavbarComponent />
											<BodyComponent />
										</div>
									)
								}
							/>
							<Route path={`/changepassword/*`} element={<p>Change PWD!</p>} />
						</Routes>
					</DropdownTitleContext.Provider>
				</OtherUserContext.Provider>
			</CurrentUserContext.Provider>
		</LanguageContext.Provider>
	);
};

export default App;
