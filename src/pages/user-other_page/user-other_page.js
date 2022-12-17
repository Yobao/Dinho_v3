import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext, OtherUserContext } from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import { USER_TABLE_BODY } from "../../store/templates";
import TableComponent from "../../components/table";
import LoadingButton from "../../components/ui/button-loading";

const UserOtherPage = () => {
   const navigateHome = useNavigate();
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { otherUser, setOtherUser } = useContext(OtherUserContext);

   const [tableData, setTableData] = useState(null);

   const userId = otherUser.slice(
      otherUser.split("/", 2).join("/").length + 1,
      otherUser.split("/", 3).join("/").length
   );

   const options = { method: "GET", undefined, accept: true };
   const { err, sendRequest } = useFetch();
   const transformData = (data) => {
      if (data.length === 0) return navigateHome("/");
      setTableData(data.reverse());
   };

   useEffect(() => {
      sendRequest(`/tips?user=${userId}`, options, transformData);
   }, []);

   if (!tableData) return <LoadingButton />;

   return (
      <div
         className='column table-width 
		is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'
      >
         <h2 className='has-text-centered title is-3 mb-5'>
            {otherUser.slice(otherUser.split("/", 3).join("/").length + 1)}
         </h2>
         <TableComponent head={applanguage.userTableHead} body={USER_TABLE_BODY} data={tableData} />
      </div>
   );
};

export default UserOtherPage;
