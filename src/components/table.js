import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext, OtherUserContext } from "../store/user-context";

const TableComponent = ({ head, body, data }) => {
	return (
		<React.Fragment>
			<table className='table is-bordered is-striped is-hoverable'>
				<thead>
					<tr>
						{head.map((column) => (
							<th key={column} className='has-text-centered is-vcentered'>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data?.map((row, iRow) => (
						<tr key={`${row.username}-${row.id}`}>
							{body.map((column, iColumn) => (
								<td key={`${row.username}-${column.name}`} className={column.class}>
									{iColumn === 0 ? iRow + 1 : row[column.name]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</React.Fragment>
	);
};

export default TableComponent;
