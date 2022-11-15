import React from "react";

const useTitle = (side, opponent, start, index) => {
	if (index === undefined)
		return !side
			? `Chelsea - ${opponent} (N)`
			: side === 1
			? `Chelsea - ${opponent}`
			: `${opponent} - Chelsea`;

	return !side
		? `${index}. Chelsea - ${opponent} (N) ${start}`
		: side === 1
		? `${index}. Chelsea - ${opponent} ${start}`
		: `${index}. ${opponent} - Chelsea ${start}`;
};

export default useTitle;
