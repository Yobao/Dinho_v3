import React, { useState, useContext, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import { URL } from "../store/data";

import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";
import { toast } from "bulma-toast";

const ForgotPwdModal = ({ showModal }) => {
	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const [email, setEmail] = useState();
	const [emailColor, setEmailColor] = useState();
	const [submitSent, setSubmitSent] = useState(false);

	const handleEmail = useCallback(
		(e) => {
			const val = e.target.value;
			setEmail(val);
			if (submitSent)
				setEmailColor(val === null || !val.includes("@") ? "is-danger" : "");
		},
		[submitSent]
	);

	const handleInputs = useMemo(
		() => ({
			handleEmail,
		}),
		[submitSent]
	);

	const inputColors = {
		emailColor,
	};
	const userData = {
		mail: email,
	};
	const requestConfig = {
		url: URL + "/reset_password",
		requestOptions: {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify(userData),
		},
	};
	const { isLoading, err, sendRequest } = useFetch();

	const transformData = (data) => {
		console.log(data, "TRANSFORM");

		if (typeof data === "number") {
			return toastik(`${applanguage.forgotPwdModal.warnings.mailNotExists}`);
		}
		if (typeof data !== "number") {
			//console.log(data);
			toastik(`${applanguage.forgotPwdModal.warnings.passwordSent}`);
			showModal();
		}
	};

	const sendEmail = useCallback(() => {
		setSubmitSent(true);

		if (!email) return toastik(`${applanguage.forgotPwdModal.warnings.fillEverything}`);
		if (!email.includes("@"))
			return toastik(`${applanguage.forgotPwdModal.warnings.mailFormat}`);
		sendRequest(requestConfig, transformData);
	}, [requestConfig]);

	const buttons = {
		sendEmail,
	};

	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<ModalComponent
					language={applanguage.forgotPwdModal}
					handleInputs={handleInputs}
					handleButtons={buttons}
					userData={userData}
					inputColors={inputColors}
					showModal={showModal}
					showEye={false}
				/>,
				document.getElementById("modal-root")
			)}
		</React.Fragment>
	);
};

export default ForgotPwdModal;
