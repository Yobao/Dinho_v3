import React, { useState } from "react";

const DropdownComponent = ({
	data,
	styleTitle,
	styleMenu,
	dropdownTitle,
	setDropdownTitle,
	handleRequest,
}) => {
	const [showMenu, setShowMenu] = useState(null);

	const handleSetValue = (e) => {
		setDropdownTitle(e.target.innerText);
		handleRequest({ match: `&m=${e.target.getAttribute("value")}`, isLoading: true });
		handleShowMenu();
	};

	const handleShowMenu = () => {
		if (!showMenu) return setShowMenu("is-active");
		return setTimeout(() => {
			document.getElementById("dropdownButton").blur();
			setShowMenu(null);
		}, 150);
	};

	return (
		<div
			className={`dropdown columns is-right dropdown-button ${showMenu}`}
			onBlur={handleShowMenu}>
			<div className='dropdown-trigger' onClick={handleShowMenu}>
				<button
					id='dropdownButton'
					className={`button title ${styleTitle}`}
					aria-haspopup='true'>
					<span>{dropdownTitle}</span>
					<span className='icon is-small'>
						<i className='fas fa-angle-down' aria-hidden='true'></i>
					</span>
				</button>
			</div>

			<div
				className='dropdown-menu'
				role='menu'
				style={{
					maxHeight: "22em",
					width: "100%",
					overflowY: "auto",
					borderStyle: "solid",
					borderWidth: "1px",
					borderColor: "grey",
					borderRadius: "5px",
				}}>
				<div className='dropdown-content has-text-centered'>
					{data.map((row) => (
						<a
							key={`${row.value}`}
							value={row.id}
							className={`dropdown-item ${styleMenu} ${
								dropdownTitle === row.value ? "is-active" : ""
							}`}
							onClick={handleSetValue}>
							{row.value}
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default DropdownComponent;
