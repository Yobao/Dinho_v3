import React, { useState, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { URL } from "./store/structure";

const ScoreTablePage = () => {
	const [tableData, setTableData] = useState(null);
	const requestConfig = {
		url: URL,
		requestOptions: {
			method: "GET",
			mode: "cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		},
	};
	const transformData = (data) => {
		setTableData(data);
	};
	const { isLoading, error, sendRequest } = useFetch();

	useEffect(() => {
		sendRequest(requestConfig, transformData);
	}, [sendRequest]);

	return (
		<React.Fragment>
			{isLoading && <h1>LOADING...</h1>}
			{!isLoading && tableData && <h1>Hello there you {tableData.table[1].username}!</h1>}
		</React.Fragment>
	);
};

export default ScoreTablePage;
