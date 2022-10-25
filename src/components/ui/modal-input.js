import React, { useRef } from "react";

const ModalInput = ({ input, handleInput }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	return (
		<div className='field'>
			<label className='label has-text-left'>
				{renderRef.current} {input.title}
			</label>
			<div className='control has-icons-left'>
				<input
					className={`input ${handleInput.color}`}
					placeholder={input.placeHolder}
					onChange={handleInput.setValue}
				/>
				<span className='icon is-small is-left'>
					<i className={`${input.icon}`}></i>
				</span>
			</div>
		</div>
	);
};

export default React.memo(ModalInput);
