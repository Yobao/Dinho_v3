import React, { Fragment, useState, useEffect, useCallback } from "react";
import useFetch from "./hooks/use-fetch";
import BodyComponent from "./pages/body";
import NavbarComponent from "./components/navbar";
import {
	CurrentUserContext,
	OtherUserContext,
	DropdownTitleContext,
	LanguageContext,
} from "./store/user-context";

const App = () => {
	return (
		<div className='App'>
			<LanguageContext.Provider value={{}}>
				<CurrentUserContext.Provider value={{}}>
					<NavbarComponent />

					<OtherUserContext.Provider value={{}}>
						<DropdownTitleContext.Provider value={{}}>
							<BodyComponent />
						</DropdownTitleContext.Provider>
					</OtherUserContext.Provider>
				</CurrentUserContext.Provider>
			</LanguageContext.Provider>
		</div>
	);
};

export default App;
