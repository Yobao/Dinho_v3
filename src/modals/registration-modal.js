import React, { useState, useContext, useRef, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import { URL } from "../store/data";

import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const RegModal = ({ showModal }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	const appLanguage = useContext(LanguageContext).appLanguage.regModal;
	const setCurrentUser = useContext(CurrentUserContext).setCurrentUser;
	const [regName, setRegName] = useState(null);
	const [regPwd, setRegPwd] = useState(null);
	const [regPwd2, setRegPwd2] = useState(null);
	const [regEmail, setRegEmail] = useState(null);
	const [regNameColor, setRegNameColor] = useState();
	const [regPwdColor, setRegPwdColor] = useState();
	const [regPwdColor2, setRegPwdColor2] = useState();
	const [regEmailColor, setRegEmailColor] = useState();
	const [team, setTeam] = useState(1);
	const [community, setCommunity] = useState();
	const [communityColor, setCommunityColor] = useState();
	const [submitSent, setSubmitSent] = useState(false);

	const handleRegName = useCallback(
		(e) => {
			const val = e.target.value;
			setRegName(val);
			if (submitSent)
				setRegNameColor(
					val.length < 3 ||
						val.length > 15 ||
						!val.match("^[a-zA-Z0-9@\\-_.]*$") ||
						!isNaN(val)
						? "is-danger"
						: ""
				);
		},
		[submitSent]
	);
	const handleRegPwd = useCallback(
		(e) => {
			setRegPwd(e.target.value);
			if (submitSent) setRegPwdColor(e.target.value.length < 6 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleRegPwd2 = useCallback(
		(e) => {
			setRegPwd2(e.target.value);
			if (submitSent) setRegPwdColor2(e.target.value.length < 6 ? "is-danger" : "");
		},
		[submitSent]
	);
	const handleRegEmail = useCallback(
		(e) => {
			const val = e.target.value;
			setRegEmail(val);
			if (submitSent)
				setRegEmailColor(
					!val.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/) ? "is-danger" : ""
				);
		},
		[submitSent]
	);
	const handleInputs = useMemo(
		() => ({
			handleRegName,
			handleRegPwd,
			handleRegPwd2,
			handleRegEmail,
		}),
		[submitSent]
	);

	const inputColors = {
		regNameColor,
		regPwdColor,
		regPwdColor2,
		regEmailColor,
	};
	const userData = {
		username: regName,
		mail: regEmail,
		password: regPwd,
		team: team,
		community: community,
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
		localStorage.setItem("dinhotoken", data.access_token);
		setCurrentUser(regName);
		showModal();
	};

	const registration = useCallback(() => {
		setSubmitSent(true);
	}, [requestConfig]);
	const buttons = {
		registration,
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
						showEye={false}
					/>
				</React.Fragment>,
				document.getElementById("modal-root")
			)}
		</React.Fragment>
	);
};

export default RegModal;
