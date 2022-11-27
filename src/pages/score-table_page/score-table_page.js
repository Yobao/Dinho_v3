import React, { useState, useEffect, useContext, useReducer } from "react";
import { LanguageContext, DropdownTitleContext } from "../../store/user-context";
import useFetch from "../../hooks/use-fetch";
import useTitle from "../../hooks/use-title";
import { SCORE_TABLE_BODY } from "../../store/templates";
import TableComponent from "../../components/table";
import PaginationComponent from "./pagination";
import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";
import DropdownComponent from "../../components/ui/dropdown";

const ScoreTablePage = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { dropdownTitle, setDropdownTitle } = useContext(DropdownTitleContext);
   const [currentPage, setCurrentPage] = useState(1);
   const [usersPerPage, setUsersPerPage] = useState(50);
   const [state, setState] = useReducer((previous, newState) => ({ ...previous, ...newState }), {
      data: null,
      matches: null,
      match: "",
      club: 1,
      isLoading: false,
   });

   const handleState = (value) => {
      setState({ match: `&m=${value}`, isLoading: true });
   };

   const options = { method: "GET" };
   const { error, sendRequest } = useFetch();

   useEffect(() => {
      const transformData = (data) => {
         const dropdown = data.matches.reverse().map((match, i, matches) => {
            const index = matches.length - i;
            const start = match.start.slice(0, match.start.length - 4);
            return {
               value: useTitle(match.side, match.opponent, start, index),
               id: match.id,
            };
         });

         if (!state.data) setState({ data: data, matches: dropdown });
         if (state.data) setState({ data: data, matches: dropdown, isLoading: false });
         setCurrentPage(1);
         if (!state.data) setDropdownTitle(dropdown[0].value);
      };

      sendRequest(`/table?club=${state.club}${state.match}`, options, transformData);
   }, [state.match]);

   useEffect(() => {
      return () => {
         setDropdownTitle(null);
      };
   }, []);

   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;

   if (!state.data && !state.matches) return <LoadingButton />;

   return (
      <div
         className='column table-width 
				is-full-mobile is-three-quarters-tablet is-three-quarters-desktop is-three-fifths-fullhd'
      >
         <div className='columns is-centered is-mobile mt-4 mb-6'>
            <DropdownComponent
               data={state.matches}
               dropdownTitle={dropdownTitle}
               setDropdownTitle={setDropdownTitle}
               handleRequest={handleState}
               styleTitle='is-size-9-mobile is-size-5-tablet is-size-4-desktop custom-mobile-width'
               styleMenu='is-size-6-mobile is-size-6-tablet is-size-5-desktop'
            />
         </div>

         {state.isLoading && <LoadingButton />}
         {!state.isLoading && (
            <React.Fragment>
               <div className='columns p-0 mx-0 my-6 is-mobile is-vcentered'>
                  <div className='column p-0 pl-1 m-0 is-5-mobile is-6-tablet has-text-left-mobile has-text-centered-tablet has-text-weight-semibold'>
                     <p className='is-size-8-mobile is-size-5-tablet is-size-4-desktop'>{`${applanguage.scoreTableTitles.total1} ${state.data.points} ${applanguage.scoreTableTitles.total2}`}</p>
                  </div>
                  <div className='column p-0 m-0 is-7-mobile is-6-tablet'>
                     {/* {state.data.goals.length === 0 && <NoGoal />} */}
                     {state.data.goals.length > 0 &&
                        state.data.goals.map((goal) => {
                           return (
                              <div
                                 className='columns p-0 mx-0 pr-1 my-2 is-mobile is-centered is-vcentered'
                                 key={`${goal.name}`}
                              >
                                 <div className='column p-0 m-0 is-9 has-text-centered-mobile has-text-right-tablet'>
                                    <p className='is-size-8-mobile is-size-6-tablet is-size-5-desktop'>{`${goal.name}`}</p>
                                 </div>
                                 <div className='column p-0 m-0 is-3 has-text-right-mobile has-text-right-tablet'>
                                    <p className='is-size-8-mobile is-size-6-tablet is-size-5-desktop'>
                                       {Math.floor(goal.points).toLocaleString()}
                                    </p>
                                 </div>
                              </div>
                           );
                        })}
                  </div>
               </div>

               <TableComponent
                  head={applanguage.scoreTableHead}
                  body={SCORE_TABLE_BODY}
                  data={state.data.table.slice(indexOfFirstUser, indexOfLastUser)}
                  position={indexOfFirstUser}
               />
               <PaginationComponent
                  currentPage={{ currentPage, setCurrentPage }}
                  length={Math.ceil(state.data.table.length / usersPerPage)}
               />
            </React.Fragment>
         )}
      </div>
   );
};

export default ScoreTablePage;
