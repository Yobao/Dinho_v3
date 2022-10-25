import React, { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/use-fetch";
import ModalInput from "./ui/modal-input";

const ModalComponent = ({ data, handleInputs, showModal }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	useEffect(() => {}, []);

	const inputs = data.inputs.map((input, i) => (
		<ModalInput
			key={input.title + "-" + i}
			input={input}
			handleInput={Object.values(handleInputs)[i]}
		/>
	));

	return (
		<div className='modal is-active'>
			<div className='modal-background' onClick={showModal}></div>
			{renderRef.current}
			<div
				className='modal-content has-background-white py-5 px-5'
				style={{ borderRadius: "1rem" }}>
				{inputs}
				<div className={`has-content-left`}>BUTTONS</div>
			</div>
			<button
				className='modal-close is-large button-close'
				aria-label='close'
				onClick={showModal}></button>
		</div>
	);
};

export default React.memo(ModalComponent);
