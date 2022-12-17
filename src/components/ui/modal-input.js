import React, { useState } from "react";

const ModalInput = ({ input, handleInput, color, showEye }) => {
   const [inputType, setInputType] = useState(input.icon === "fas fa-lock" ? "password" : "text");
   const handleShowPwd = () => {
      setInputType(inputType === "password" ? "text" : "password");
   };

   return (
      <div className='field'>
         <label className='label has-text-left'>{input.title}</label>
         <div className='control has-icons-left'>
            <input
               className={`input ${color}`}
               type={inputType}
               placeholder={input.placeHolder}
               onChange={handleInput}
            />
            <span className='icon is-small is-left'>
               <i className={`${input.icon}`}></i>
            </span>
            {input.icon === "fas fa-lock" && showEye && (
               <span
                  className='icon is-clickable'
                  style={{ position: "absolute", right: "10px" }}
                  onClick={handleShowPwd}
               >
                  <i className={`fas fa-eye${inputType === "password" ? "" : "-slash"}`}></i>
               </span>
            )}
         </div>
      </div>
   );
};

export default React.memo(ModalInput);
