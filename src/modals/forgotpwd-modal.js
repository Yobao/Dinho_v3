import React, { useState, useContext, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/use-fetch";
import { LanguageContext } from "../store/user-context";
import ModalComponent from "../components/modal";
import toastik from "../components/ui/toast";

const ForgotPwdModal = ({ showModal }) => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const alerts = applanguage.forgotPwdModal.warnings;
   const [email, setEmail] = useState();
   const [emailColor, setEmailColor] = useState();
   const [submitSent, setSubmitSent] = useState(false);

   const handleEmail = useCallback(
      (e) => {
         const val = e.target.value;
         setEmail(val);
         if (submitSent)
            setEmailColor(
               !val.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/) ? "is-danger" : ""
            );
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

   const options = {
      method: "POST",
      undefined,
      accept: true,
      body: JSON.stringify(userData),
   };
   const { err, sendRequest } = useFetch();

   const transformData = (data) => {
      if (typeof data === "number" && data !== 200 && data !== 201 && data !== 500) {
         return toastik(alerts.mailNotExists);
      }
      if (data === 500) return toastik(alerts.somethingWrong);
      toastik(alerts.passwordSent, "is-success");
      showModal();
   };

   const sendEmail = useCallback(() => {
      setSubmitSent(true);
      if (!email) {
         setEmailColor("is-danger");
         return toastik(alerts.fillEverything);
      }
      if (!email.includes("@")) {
         setEmailColor("is-danger");
         return toastik(alerts.mailFormat);
      }
      sendRequest("/reset_password", options, transformData);
   }, [options]);

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
