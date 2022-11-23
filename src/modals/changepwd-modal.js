import React, { useState, useContext, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { LanguageContext } from "../store/user-context";
import { URL } from "../store/data";

import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const ChangePwdModal = ({ showModal }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const [oldPwd, setOldPwd] = useState();
	const [newPwd, setNewPwd] = useState();
	const [oldPwdColor, setOldPwdColor] = useState();
	const [newPwdColor, setNewPwdColor] = useState();
	const [submitSent, setSubmitSent] = useState(false);

	const handleOldPwd = useCallback(
		(e) => {
			setOldPwd(e.target.value);
			if (submitSent) setOldPwdColor(e.target.value.length < 6 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleNewPwd = useCallback(
		(e) => {
			setNewPwd(e.target.value);
			if (submitSent) setNewPwdColor(e.target.value.length < 6 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleInputs = useMemo(
		() => ({
			handleOldPwd,
			handleNewPwd,
		}),
		[submitSent]
	);

	const inputColors = {
		oldPwdColor,
		newPwdColor,
	};
	const userData = {
		old_password: oldPwd,
		new_password: newPwd,
	};
	const options = {
		method: "POST",
		undefined,
		accept: true,
		body: JSON.stringify(userData),
	};

	const { isLoading, err, sendRequest } = useFetch();
	const transformData = (data) => {
		showModal();
		window.location.href = `${URL}/`;
	};

	const changePassword = useCallback(() => {
		setSubmitSent(true);
		sendRequest("/change_password", options, transformData);
	}, [options.body]);

	const buttons = {
		changePassword,
	};

	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<React.Fragment>
					RENDERS {renderRef.current}
					<ModalComponent
						language={applanguage.changePwdModal}
						handleInputs={handleInputs}
						handleButtons={buttons}
						userData={userData}
						inputColors={inputColors}
						showModal={showModal}
						showEye={true}
					/>
				</React.Fragment>,
				document.getElementById("modal-root")
			)}
		</React.Fragment>
	);
};

export default ChangePwdModal;
