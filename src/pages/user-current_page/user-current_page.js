import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext, CurrentUserContext } from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";

import { URL } from "../../store/data";
import { USER_TABLE_BODY } from "../../store/templates";

import TableComponent from "../../components/table";
import LoadingButton from "../../components/ui/button-loading";

const UserCurrentPage = () => {
	const navigateHome = useNavigate();
	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const [tableData, setTableData] = useState(null);

	const options = { method: "GET", undefined, accept: true };
	const { isLoading, err, sendRequest } = useFetch();
	const transformData = (data) => {
		setTableData(data.reverse());
	};

	useEffect(() => {
		sendRequest(`/tips?user=${currentUser.id}`, options, transformData);
	}, []);

	if (isLoading) return <LoadingButton />;

	return (
		<div
			className='column table-width 
		is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'>
			{!isLoading && tableData && (
				<React.Fragment>
					<h2 className='has-text-centered title is-3 mb-5'>{currentUser.user}</h2>
					<TableComponent
						head={applanguage.userTableHead}
						body={USER_TABLE_BODY}
						data={tableData}
					/>
				</React.Fragment>
			)}
		</div>
	);
};

export default UserCurrentPage;
