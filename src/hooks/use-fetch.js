import React, { useState, useCallback } from "react";
//In order to make hook work, it is neccessary to create requestConfig object which will contain
//request url as well as request header in the component where we want to fetch data.

const useFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, requestConfig.requestOptions);
			const data = await response.json();

			if (response.status === 200) {
				applyData(data);
			}
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		sendRequest,
	};
};

export default useFetch;
