import React, { Fragment, useState, useEffect, useMemo } from "react";
import "bulma/css/bulma.css";
//import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.css";
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

const App = () => {
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
	//localStorage.setItem("dinhotoken", "9dd7d5163b7ac4779cd044a2ec88abccae4c8541");

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
								<BodyComponent />
							</div>
						)}
					</DropdownTitleContext.Provider>
				</OtherUserContext.Provider>
			</CurrentUserContext.Provider>
		</LanguageContext.Provider>
	);
};

export default App;
