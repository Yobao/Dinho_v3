import React, { useState, useContext, useCallback, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const LoginModal = ({ showModal, showAnotherModal: showForgotPwd }) => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
   const alerts = applanguage.loginModal.warnings;
   const [loginName, setLoginName] = useState(null);
   const [loginPwd, setLoginPwd] = useState(null);
   const [loginNameColor, setLoginNameColor] = useState();
   const [loginPwdColor, setLoginPwdColor] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [submitSent, setSubmitSent] = useState(false);

   const handleLoginName = useCallback(
      (e) => {
         const val = e.target.value;
         setLoginName(val);
         if (submitSent && e.nativeEvent.inputType === "insertText")
            setLoginNameColor(val.length < 3 ? "is-danger" : "");
      },
      [submitSent]
   );
   const handleLoginPwd = useCallback(
      (e) => {
         const val = e.target.value;
         setLoginPwd(val);
         if (submitSent && e.nativeEvent.inputType === "insertText")
            setLoginPwdColor(val.length < 6 ? "is-danger" : "");
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

   const handleInputColors = {
      setLoginNameColor,
      setLoginPwdColor,
   };
   const inputColors = {
      loginNameColor,
      loginPwdColor,
   };
   const userData = {
      username: loginName,
      password: loginPwd,
   };
   const options = {
      method: "POST",
      undefined,
      accept: true,
      body: JSON.stringify(userData),
   };

   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      if (data === 401 || data === 422) {
         setIsLoading(false);
         setLoginNameColor("is-danger");
         setLoginPwdColor("is-danger");
         return toastik(alerts.warning);
      }
      if (data === 500) return toastik(alerts.somethingWrong);
      localStorage.setItem("dinhotoken", data.access_token);
      setCurrentUser({ user: loginName, id: data.user_id });
      showModal();
   };

   const login = useCallback(() => {
      setSubmitSent(true);
      let index = 0;
      let message = null;

      for (const input in userData) {
         if (userData[input] === null) {
            if (!message) message = alerts.fillEverything;
            Object.values(handleInputColors)[index]("is-danger");
         }
         index++;
      }
      if (message) return toastik(message);

      sendRequest("/login", options, transformData);

      setIsLoading(true);
   }, [options.body]);

   const lostPwd = useCallback(() => {
      showModal();
      showForgotPwd();
   }, []);

   const buttons = {
      login,
      lostPwd,
   };

   return (
      <React.Fragment>
         {ReactDOM.createPortal(
            <React.Fragment>
               <ModalComponent
                  language={applanguage.loginModal}
                  handleInputs={handleInputs}
                  handleButtons={buttons}
                  userData={userData}
                  inputColors={inputColors}
                  showModal={showModal}
                  showEye={true}
                  isLoading={isLoading}
               />
            </React.Fragment>,
            document.getElementById("modal-root")
         )}
      </React.Fragment>
   );
};

export default LoginModal;
