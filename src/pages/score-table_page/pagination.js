import React, { useState, useContext } from "react";
import { LanguageContext } from "../../store/user-context";

const PaginationComponent = ({ length, currentPage }) => {
	const languageContext = useContext(LanguageContext);

	const pages = Array.apply(null, { length: length }).map(Number.call, Number);

	const changeCurrentPage = (e) => {
		currentPage.setCurrentPage(parseInt(e.target.getAttribute("value")));
		window.scrollTo(0, 0);
	};

	const PageButton = ({ page }) => {
		return (
			<li>
				<a
					value={page + 1}
					className={`pagination-link ${
						page === currentPage.currentPage - 1 ? "is-current" : ""
					}`}
					aria-label={`Goto page ${page + 1}`}
					onClick={changeCurrentPage}>
					{page + 1}
				</a>
			</li>
		);
	};

	return (
		<nav className='pagination is-centered' role='navigation' aria-label='pagination'>
			<ul className='pagination-list'>
				{pages.map((page) => (
					<PageButton key={`page-${page}`} page={page} />
				))}
			</ul>
		</nav>
	);
};

export default PaginationComponent;
