import React, { useState, useEffect, useContext, useRef } from "react";
import {
	LanguageContext,
	OtherUserContext,
	CurrentUserContext,
	DropdownTitleContext,
} from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import { URL } from "../../store/data";
import { SCORE_TABLE_BODY } from "../../store/templates";
import TableComponent from "../../components/table";
import PaginationComponent from "./pagination";
import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";
import DropdownComponent from "../../components/ui/dropdown";

const ScoreTablePage = () => {
	const renderRef = useRef(0);
	renderRef.current = renderRef.current + 1;

	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const { dropdownTitle, setDropdownTitle } = useContext(DropdownTitleContext);

	const [tableData, setTableData] = useState(null);
	const [dropdownData, setDropdownData] = useState(null);
	const [match, setMatch] = useState("");
	const [club, setClub] = useState(1);

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUsersPerPage] = useState(50);
	const [isLoadingRound, setIsLoadingRound] = useState(false);

	const requestConfig = {
		url: URL + `/table?club=${club}${match}`,
		requestOptions: {
			method: "GET",
			mode: "cors",
			headers: { "Access-Control-Allow-Origin": "*" },
		},
	};
	const { isLoading, error, sendRequest } = useFetch();

	useEffect(() => {
		const transformData = (data) => {
			if (dropdownData === null) {
				const createDropdownData = data.matches.reverse().map((match, i, matches) => {
					const index = matches.length - i;
					const start = match.start.slice(0, match.start.length - 4);
					return {
						value: !match.side
							? `${index}. Chelsea - ${match.opponent} (N) ${start}`
							: match.side === 1
							? `${index}. Chelsea - ${match.opponent} ${start}`
							: `${index}. ${match.opponent} - Chelsea ${start}`,
						id: match.id,
					};
				});
				setDropdownData(createDropdownData);
				setDropdownTitle(createDropdownData[0].value);
			}
			setIsLoadingRound(false);
			setCurrentPage(1);
			setTableData(data);
		};

		setIsLoadingRound(true);
		sendRequest(requestConfig, transformData);
	}, [sendRequest, match]);

	useEffect(() => {
		return () => {
			setDropdownTitle(null);
		};
	}, []);

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;

	if (isLoading && !tableData) return <LoadingButton />;

	return (
		<div
			className='column table-width 
				is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'>
			{/* 			<h3>ScoreTable render: {renderRef.current}</h3>
			<h2>DROPDOWN HERE</h2>
 */}
			<div className='columns is-centered is-mobile mt-4 mb-6'>
				<DropdownComponent
					data={dropdownData}
					dropdown={{ dropdownTitle, setDropdownTitle, setId: setMatch }}
					style={{
						title:
							"is-size-9-mobile is-size-5-tablet is-size-4-desktop custom-mobile-width",
						menu: "is-size-6-mobile is-size-6-tablet is-size-5-desktop",
					}}
				/>
			</div>

			<div className='columns is-mobile '>
				<div className='column has-text-centered'>
					<p className='is-size-6-mobile'>{`${applanguage.scoreTableTitles.total1} ${tableData?.points} ${applanguage.scoreTableTitles.total2}`}</p>
				</div>
				<div className='column'>
					{tableData?.goals.map((goal) => {
						return (
							<div className='columns is-mobile' key={`${goal.name}`}>
								<div className='column'>
									<p className='is-size-6-mobile'>{`${goal.name}`}</p>
								</div>
								<div className='column'>
									<p className='is-size-6-mobile'>{Math.floor(goal.points)}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{isLoadingRound && <LoadingButton />}
			{!isLoadingRound && (
				<React.Fragment>
					<TableComponent
						head={applanguage.scoreTableHead}
						body={SCORE_TABLE_BODY}
						data={tableData?.table.slice(indexOfFirstUser, indexOfLastUser)}
						position={indexOfFirstUser}
					/>
					<PaginationComponent
						currentPage={{ currentPage, setCurrentPage }}
						length={Math.ceil(tableData?.table.length / usersPerPage)}
					/>
				</React.Fragment>
			)}
		</div>
	);
};

export default ScoreTablePage;
