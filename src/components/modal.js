import React, { useState, useEffect, useCallback, Fragment } from "react";
import useFetch from "../hooks/use-fetch";

const ModalComponent = (props) => {
	useEffect(() => {}, []);

	return (
		<div className='modal'>
			<div className='modal-background' onClick={props.showModal}></div>
			<div className='modal-content'></div>
		</div>
	);
};

export default ModalComponent;
