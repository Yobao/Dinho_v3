import React from "react";

function LoadingButton() {
	return (
		<div className='has-text-centered'>
			<button
				className='button is-centered is-loading is-large py-6 is-fullwidth'
				style={{ borderColor: "white" }}>
				loading
			</button>
		</div>
	);
}

export default LoadingButton;
