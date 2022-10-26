import React, { useState, useContext, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import { URL } from "../store/data";

import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const LoginModal = ({ showModal }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	const appLanguage = useContext(LanguageContext).appLanguage.loginModal;
	const setCurrentUser = useContext(CurrentUserContext).setCurrentUser;
	const [loginName, setLoginName] = useState(null);
	const [loginPwd, setLoginPwd] = useState(null);
	const [loginNameColor, setLoginNameColor] = useState();
	const [loginPwdColor, setLoginPwdColor] = useState();
	const [submitSent, setSubmitSent] = useState(false);

	const handleLoginName = useCallback(
		(e) => {
			setLoginName(e.target.value);
			if (submitSent) setLoginNameColor(e.target.value.length < 3 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleLoginPwd = useCallback(
		(e) => {
			setLoginPwd(e.target.value);
			if (submitSent) setLoginPwdColor(e.target.value.length < 6 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleInputs = useMemo(
		() => ({
			handleLoginName,
			handleLoginPwd,
		}),
		[submitSent]
	);

	const inputColors = {
		loginNameColor,
		loginPwdColor,
	};
	const userData = {
		username: loginName,
		password: loginPwd,
	};
	const requestConfig = {
		url: URL + "/login",
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
		if (data === 401 || data === 422) {
			setLoginNameColor("is-danger");
			setLoginPwdColor("is-danger");
			return toastik(`${appLanguage.warnings.warning}`);
		}
		if (err !== undefined) return toastik(`${appLanguage.warnings.somethingWrong}`);

		localStorage.setItem("dinhotoken", data.access_token);
		setCurrentUser(loginName);
		showModal();
	};

	const login = useCallback(() => {
		setSubmitSent(true);
		sendRequest(requestConfig, transformData);
	}, [requestConfig]);
	const lostPwd = useCallback(() => {
		showModal();
	}, []);
	const buttons = {
		login,
		lostPwd,
	};

	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<React.Fragment>
					RENDERS {renderRef.current}
					<ModalComponent
						language={appLanguage}
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

export default LoginModal;
