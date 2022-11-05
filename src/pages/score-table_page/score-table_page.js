import React, { useState, useEffect, useContext, useRef } from "react";
import {
	LanguageContext,
	OtherUserContext,
	CurrentUserContext,
} from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import { URL } from "../../store/data";
import { SCORE_TABLE_BODY } from "../../store/templates";
import TableComponent from "../../components/table";
import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";

const ScoreTablePage = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const { currentUser, setCurrentuser } = useContext(CurrentUserContext);
	const { otherUser, setOtherUser } = useContext(OtherUserContext);

	const [isLoadingRound, setIsLoadingRoung] = useState(false);
	const [tableData, setTableData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUsersPerPage] = useState(50);

	const requestConfig = {
		url: URL + "/table?club=1",
		requestOptions: {
			method: "GET",
			mode: "cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		},
	};

	const { isLoading, error, sendRequest } = useFetch();

	useEffect(() => {
		const transformData = (data) => {
			setTableData(data);
		};
		sendRequest(requestConfig, transformData);
	}, [sendRequest]);

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;

	if (isLoading) return <LoadingButton />;

	return (
		<div className='column is-full-mobile is-two-thirds-tablet is-half-desktop table-width'>
			{/* 			<h3>ScoreTable render: {renderRef.current}</h3>
			<h2>DROPDOWN HERE</h2> */}
			<TableComponent
				head={applanguage.scoreTableHead}
				body={SCORE_TABLE_BODY}
				data={tableData?.table}
			/>
		</div>
	);
};

export default React.memo(ScoreTablePage);
