import React, { useEffect, useRef } from "react";
import ModalInput from "./ui/modal-input";
import ButtonComponent from "./ui/button";
import LoadingButton from "./ui/button-loading";

const ModalComponent = ({
   language,
   handleInputs,
   handleButtons,
   userData,
   inputColors,
   showModal,
   showEye,
   dropdown,
   isLoading,
}) => {
   const renderRef = useRef(0);
   renderRef.current++;

   //console.log(inputColors);

   useEffect(() => {
      const handleKeys = (e) => {
         if (e.keyCode === 27) return showModal();
         if (e.keyCode === 13) return Object.values(handleButtons)[0](e);
      };
      window.addEventListener("keydown", handleKeys);
      return () => window.removeEventListener("keydown", handleKeys);
   }, [...Object.values(userData)]);

   const inputs = language.inputs.map((input, i) => (
      <ModalInput
         key={input.title + "-" + i}
         input={input}
         handleInput={Object.values(handleInputs)[i]}
         color={Object.values(inputColors)[i]}
         showEye={showEye}
      />
   ));
   const buttons = language.buttons.map((button, i) => (
      <ButtonComponent
         key={button.title + "-" + i}
         button={button}
         handleButton={Object.values(handleButtons)[i]}
      />
   ));

   return (
      <div className='modal is-active'>
         <div className='modal-background' onClick={showModal}></div>
         <div
            className='modal-content has-background-white py-5 px-5'
            style={{ borderRadius: "1rem", minHeight: "304px" }}
         >
            {isLoading && (
               <div
                  className='columns is-mobile is-centered is-vcentered'
                  style={{ minHeight: "304px" }}
               >
                  <LoadingButton />
               </div>
            )}
            {!isLoading && (
               <React.Fragment>
                  {renderRef.current}
                  {inputs}
                  <div className={`has-content-left`}>{buttons}</div>
               </React.Fragment>
            )}
         </div>
         <button
            className='modal-close is-large button-close'
            aria-label='close'
            onClick={showModal}
         ></button>
      </div>
   );
};

export default React.memo(ModalComponent);
