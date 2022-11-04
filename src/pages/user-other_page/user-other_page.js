import React, { useState, useEffect, useContext } from "react";
import { OtherUserContext } from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import { URL } from "../../store/data";

import { useNavigate } from "react-router-dom";

const UserOtherPage = () => {
	const { otherUser, setOtherUser } = useContext(OtherUserContext);
	const navigateHome = useNavigate();
	const userId = otherUser.slice(otherUser.lastIndexOf("/") + 1);

	const requestConfig = {
		url: URL + "/tips?user=" + userId,
		requestOptions: {
			method: "GET",
			mode: "cors",
			headers: { "Access-Control-Allow-Origin": "*", accept: "application/json" },
		},
	};

	const { isLoading, err, sendRequest } = useFetch();
	const transformData = (data) => {
		if (data.length === 0) return navigateHome("/");
	};

	useEffect(() => {
		sendRequest(requestConfig, transformData);
	}, []);

	return <h1>{`UserOtherPage Page! ${otherUser}`}</h1>;
};

export default UserOtherPage;
