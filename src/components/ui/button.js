import React, { useRef } from "react";

const ButtonComponent = ({ handleButton, button }) => {
	return (
		<button
			type='button'
			className={`button mt-3 mr-3 mb-3 ${button.style}`}
			onClick={handleButton}>
			{button.text}
		</button>
	);
};

export default React.memo(ButtonComponent);
