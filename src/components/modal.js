import React, { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/use-fetch";
import ModalInput from "./ui/modal-input";
import ButtonComponent from "./ui/button";

const ModalComponent = ({
	language,
	handleInputs,
	handleButtons,
	userData,
	inputColors,
	showModal,
	showEye,
}) => {
	const renderRef = useRef(0);
	renderRef.current++;

	useEffect(() => {
		const handleKeys = (e) => {
			if (e.keyCode === 27) return showModal();
			if (e.keyCode === 13) return handleButtons.login(e);
		};
		window.addEventListener("keydown", handleKeys);
		return () => window.removeEventListener("keydown", handleKeys);
	}, [...Object.values(userData)]);

	const inputs = language.inputs.map((input, i) => (
		<ModalInput
			key={input.title + "-" + i}
			input={input}
			handleInput={Object.values(handleInputs)[i]}
			color={Object.values(inputColors)[i]}
			showEye={showEye}
		/>
	));
	const buttons = language.buttons.map((button, i) => (
		<ButtonComponent
			key={button.title + "-" + i}
			button={button}
			handleButton={Object.values(handleButtons)[i]}
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
				<div className={`has-content-left`}>{buttons}</div>
			</div>
			<button
				className='modal-close is-large button-close'
				aria-label='close'
				onClick={showModal}></button>
		</div>
	);
};

export default ModalComponent;
