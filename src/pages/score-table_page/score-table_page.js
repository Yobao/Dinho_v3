import React, { useState, useEffect, useContext, useRef } from "react";
import { LanguageContext, DropdownTitleContext } from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import useTitle from "../../hooks/use-title";
import { URL } from "../../store/data";
import { SCORE_TABLE_BODY } from "../../store/templates";
import TableComponent from "../../components/table";
import PaginationComponent from "./pagination";
import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";
import DropdownComponent from "../../components/ui/dropdown";

const ScoreTablePage = () => {
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
						value: useTitle(match.side, match.opponent, start, index),
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

	/* 	!match.side
							? `${index}. Chelsea - ${match.opponent} (N) ${start}`
							: match.side === 1
							? `${index}. Chelsea - ${match.opponent} ${start}`
							: `${index}. ${match.opponent} - Chelsea ${start}`, */

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;

	const NoGoal = () => {
		return (
			<div className=''>
				<p className=''>PRAZDNO TU JE</p>
			</div>
		);
	};

	if (isLoading && !tableData) return <LoadingButton />;

	return (
		<div
			className='column table-width 
				is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'>
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

			{isLoadingRound && <LoadingButton />}
			{!isLoadingRound && (
				<React.Fragment>
					<div className='columns p-0 mx-0 my-6 is-mobile is-vcentered'>
						<div className='column p-0 pl-1 m-0 is-5-mobile is-6-tablet has-text-left-mobile has-text-centered-tablet has-text-weight-semibold'>
							<p className='is-size-8-mobile is-size-5-tablet is-size-4-desktop'>{`${applanguage.scoreTableTitles.total1} ${tableData?.points} ${applanguage.scoreTableTitles.total2}`}</p>
						</div>
						<div className='column p-0 m-0 is-7-mobile is-6-tablet'>
							{tableData?.goals.length === 0 && <NoGoal />}
							{tableData?.goals.length > 0 &&
								tableData?.goals.map((goal) => {
									return (
										<div
											className='columns p-0 mx-0 pr-1 my-2 is-mobile is-centered is-vcentered'
											key={`${goal.name}`}>
											<div className='column p-0 m-0 is-9 has-text-centered-mobile has-text-right-tablet'>
												<p className='is-size-8-mobile is-size-6-tablet is-size-5-desktop'>{`${goal.name}`}</p>
											</div>
											<div className='column p-0 m-0 is-3 has-text-right-mobile has-text-right-tablet'>
												<p className='is-size-8-mobile is-size-6-tablet is-size-5-desktop'>
													{Math.floor(goal.points).toLocaleString()}
												</p>
											</div>
										</div>
									);
								})}
						</div>
					</div>

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
