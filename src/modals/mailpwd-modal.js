import React, { useState, useContext, useCallback, useMemo, useRef } from "react";
import useFetch from "../hooks/use-fetch";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext, LanguageContext } from "../store/user-context";
import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const MailPwdModal = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
   const alerts = applanguage.mailPwd.warnings;
   const [password1, setPassword1] = useState(null);
   const [password2, setPassword2] = useState(null);
   const [password1Color, setPassword1Color] = useState();
   const [password2Color, setPassword2Color] = useState();
   const urlToken = useRef(location.pathname.split("/").pop());
   const [submitSent, setSubmitSent] = useState(false);
   const navigate = useNavigate();

   const handlePassword1 = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setPassword1(val);
         const validation = () => {
            setPassword1Color(val.length < 6 ? "is-danger" : "");
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handlePassword2 = useCallback(
      (e) => {
         const val = e?.target === undefined ? e : e.target.value;
         setPassword2(val);
         const validation = () => {
            setPassword2Color(val.length < 6 ? "is-danger" : "");
         };
         if (submitSent || e?.target === undefined) validation();
      },
      [submitSent]
   );
   const handleInputs = useMemo(
      () => ({
         handlePassword1,
         handlePassword2,
      }),
      [submitSent]
   );

   const handleInputColors = {
      setPassword1Color,
      setPassword2Color,
   };
   const inputColors = {
      password1Color,
      password2Color,
   };
   const userData = {
      token: urlToken.current,
      password: password2,
   };
   const options = {
      method: "POST",
      undefined,
      accept: true,
      body: JSON.stringify(userData),
   };

   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      if (data === 400 || data === 409) return toastik(alerts.pwdMin);
      if (data === 404 || data === 500) return toastik(alerts.somethingWrong);
      navigate("/");
   };

   const changePassword = () => {
      setSubmitSent(true);
      let message;
      let index = 0;
      let checkUserData = {
         password1,
         password2,
      };

      // Fill all fields condition.
      for (const input in checkUserData) {
         if (checkUserData[input] === null || checkUserData[input] === "") {
            if (!message) message = alerts.fillEverything;
            Object.values(handleInputColors)[index]("is-danger");
         }
         index++;
      }
      if (message) return toastik(message);
      // Not matching passwords condition.
      if (password1 !== password2) {
         setPassword1Color("is-danger");
         setPassword2Color("is-danger");
         return toastik(alerts.pwdNotMatch);
      }
      // Inputfield specific.
      for (let i = 0; i < Object.keys(handleInputs).length; i++) {
         Object.values(handleInputs)[i](Object.values(checkUserData)[i]);
      }

      sendRequest("/set_password", options, transformData);
   };

   const buttons = {
      changePassword,
   };

   return (
      <ModalComponent
         language={applanguage.mailPwd}
         handleInputs={handleInputs}
         handleButtons={buttons}
         userData={userData}
         inputColors={inputColors}
         showEye={true}
      />
   );
};

export default MailPwdModal;
