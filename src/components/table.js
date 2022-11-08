import React, { useState, useEffect, useRef, useContext } from "react";
import { CurrentUserContext, OtherUserContext } from "../store/user-context";
import { Link } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ head, body, data, position }) => {
	const { otherUser, setOtherUser } = useContext(OtherUserContext);
	const navigate = useNavigate();

	const handleNavigate = (path) => {
		setOtherUser(`/${path}`);
		console.log("NAVIGATE");
		navigate(`/${path}`);
	};

	return (
		<React.Fragment>
			{data && (
				<table className='table is-bordered is-striped is-hoverable is-narrow is-fullwidth is-mobile has-text-centered is-size-7-mobile is-full-tablet'>
					<thead>
						<tr>
							{head.map((column, i) => (
								<th
									key={column}
									className='has-text-centered is-vcentered is-size-8-mobile is-full-tablet'>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((row, iRow) => (
							<tr key={`${row.username}-${row.id}`} className='custom-mobile-row-height'>
								{body.map((column, iColumn) => (
									<td
										key={`${row.username}-${column.name}`}
										className={`is-vcentered ${column.class}`}
										onClick={() => {
											if (iColumn === 1) handleNavigate(`user/${row.id}/${row.username}`);
										}}>
										{iColumn === 0
											? `${position + iRow + 1} ${
													row.prize === null ? "" : `(${row.prize}€)`
											  }`
											: !isNaN(Number(row[column.name]))
											? Number(row[column.name])
											: row[column.name]}
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

// (${row.prize}€)
