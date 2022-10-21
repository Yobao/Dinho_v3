import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useFetch from "../../hooks/use-fetch";
import { URL } from "../../store/data";

const ScoreTablePage = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const [tableData, setTableData] = useState(null);
	const requestConfig = {
		url: URL + "/table?club=0",
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
	}, []);

	console.log("ASDF");

	return (
		<React.Fragment>
			{isLoading && <h1>LOADING...</h1>}
			{!isLoading && tableData && (
				<h1>
					Hello there you {tableData.table[1].username}! {renderRef.current}
				</h1>
			)}
			<h3>Table render: {renderRef.current}</h3>
		</React.Fragment>
	);
};

export default ScoreTablePage;
