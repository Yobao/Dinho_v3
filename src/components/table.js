import React, { useState, useEffect, useRef, useContext } from "react";
import { CurrentUserContext, OtherUserContext } from "../store/user-context";
import { Link } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ head, body, data }) => {
	const { otherUser, setOtherUser } = useContext(OtherUserContext);
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		setOtherUser(e);
		navigate(`/${e}`);
	};

	return (
		<React.Fragment>
			{data && (
				<table className='table is-bordered is-striped is-hoverable is-narrow is-fullwidth is-mobile has-text-centered is-size-7-mobile is-full-tablet'>
					<thead>
						<tr>
							{head.map((column) => (
								<th
									key={column}
									className='has-text-centered is-vcentered is-size-7-mobile is-full-tablet'>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((row, iRow) => (
							<tr key={`${row.username}-${row.id}`}>
								{body.map((column, iColumn) => (
									<td
										key={`${row.username}-${column.name}`}
										id={`${row.username}/${row.id}`}
										className={column.class}
										onClick={(e) => {
											if (iColumn === 1) handleNavigate(e.target.id);
										}}>
										{iColumn === 0 ? iRow + 1 : row[column.name]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</React.Fragment>
	);
};

export default TableComponent;
