import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import useFetch from "./hooks/use-fetch";
import BodyComponent from "./pages/body";
import NavbarComponent from "./components/navbar";
import {
	CurrentUserContext,
	OtherUserContext,
	DropdownTitleContext,
	LanguageContext,
} from "./store/user-context";
import * as TRANSLATIONS from "./store/translations";
import { LANGUAGES, URL } from "./store/data";

const token = "35ca651f7f71a98d6162d93fb13a06bd04311050";

const App = () => {
	if (!localStorage.getItem("dinholanguage"))
		localStorage.setItem("dinholanguage", window.navigator.language.toLowerCase());
	const [appLanguage, setAppLanguage] = useState(() => {
		for (const language in LANGUAGES) {
			if (LANGUAGES[language].includes(localStorage.getItem("dinholanguage"))) {
				return TRANSLATIONS[language];
			} else {
				return TRANSLATIONS["CZECH"];
			}
		}
	});
	const [currentUser, setCurrentUser] = useState();
	const [otherUser, setOtherUser] = useState({ otherUserName: null, otherUserId: null });
	const [title, setTitle] = useState(null);

	const requestConfig = {
		url: URL + "/autologin",
		requestOptions: {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				/* Authorization: `Bearer ${localStorage.getItem("dinhotoken")}`, */
			},
		},
	};
	const { isLoading, error, sendRequest } = useFetch();
	const transformData = (data) => {
		setCurrentUser(data.id);
	};

	/* 	useEffect(() => {
		sendRequest(requestConfig, transformData);
	}, [sendRequest]); */

	return (
		<div className='App'>
			<LanguageContext.Provider
				value={{ appLanguage: appLanguage, setAppLanguage: setAppLanguage }}>
				<CurrentUserContext.Provider
					value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}>
					<NavbarComponent />

					<OtherUserContext.Provider
						value={{ otherUser: otherUser, setOtherUser: setOtherUser }}>
						<DropdownTitleContext.Provider value={{ title: title, setTitle: setTitle }}>
							<BodyComponent />
						</DropdownTitleContext.Provider>
					</OtherUserContext.Provider>
				</CurrentUserContext.Provider>
			</LanguageContext.Provider>
		</div>
	);
};

export default App;
