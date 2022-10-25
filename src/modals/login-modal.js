import React, {
	useState,
	useEffect,
	useContext,
	useRef,
	useCallback,
	useMemo,
} from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { LanguageContext } from "../store/user-context";
import { URL } from "../store/data";

import ModalComponent from "../components/modal";

const LoginModal = ({ showModal }) => {
	const renderRef = useRef(0);
	renderRef.current++;

	const appLanguage = useContext(LanguageContext).appLanguage.loginModal;
	const [loginName, setLoginName] = useState(null);
	const [loginPwd, setLoginPwd] = useState(null);
	const [loginNameColor, setLoginNameColor] = useState();
	const [loginPwdColor, setLoginPwdColor] = useState();
	const [submitSent, setSubmitSent] = useState(false);

	const handleLoginName = useCallback((e) => {
		setLoginName(e.target.value);
		if (submitSent) setLoginNameColor(e.target.value.length < 3 ? "is-danger" : "");
	}, []);
	const handleLoginPwd = useCallback((e) => {
		setLoginPwd(e.target.value);
		if (submitSent) setLoginPwdColor(e.target.value.length < 6 ? "is-danger" : "");
	}, []);

	const handleInputs = useMemo(
		() => ({
			loginName: {
				setValue: handleLoginName,
				color: loginNameColor,
			},
			loginPwd: { setValue: handleLoginPwd, color: loginPwdColor },
		}),
		[]
	);

	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<React.Fragment>
					RENDERS {renderRef.current}
					<ModalComponent
						data={appLanguage}
						handleInputs={handleInputs}
						showModal={showModal}
					/>
				</React.Fragment>,
				document.getElementById("modal-root")
			)}
		</React.Fragment>
	);
};

export default LoginModal;
