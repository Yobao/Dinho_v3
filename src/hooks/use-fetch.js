import { apply } from "file-loader";
import React, { useState, useCallback } from "react";
//In order to make hook work, it is neccessary to create requestConfig object which will contain
//request url as well as request header in the component where we want to fetch data.

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isAuth, setIsAuth] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		try {
			const response = await fetch(requestConfig.url, requestConfig.requestOptions);
			if (response.status !== 200 && response.status !== 201) applyData(response.status);
			const data = await response.json();

			if (data) applyData(data);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
		if (requestConfig.url.slice(-9) === "autologin") setIsAuth(true);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
		isAuth,
	};
};

export default useFetch;
