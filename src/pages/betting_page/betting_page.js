import React, { useState, useEffect, useContext, useRef } from "react";
import useFetch from "../../hooks/use-fetch";
import useTitle from "../../hooks/use-title";
import useFormatTime from "../../hooks/use-format-time";
import Pusher from "pusher-js";
import { LanguageContext, CurrentUserContext } from "../../store/user-context";
import { URL } from "../../store/data";
import { ws } from "../../local";

import CardComponent from "./card";
import TimeComponent from "./time";
import LoadingButton from "../../components/ui/button-loading";
import { toast } from "bulma-toast";

const BettingPage = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
   const [data, setData] = useState(null);
   const [team, setTeam] = useState(1);
   const { handleTime } = useFormatTime();
   const [forceRefresh, setForceRefresh] = useState(false);
   const isRenderedFirstTime = useRef(true);

   const handleTooltip = (fixtures) => {
      const finalFixtures = fixtures
         .map((match, i) => {
            const date = new Date(match.start);
            const completeDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

            return `${completeDate} ${match.match} ${
               match.side == 1 ? "(H)" : match.side == 0 ? "(N)" : "(A)"
            }\n`;
         })
         .join("");
      return finalFixtures;
   };

   const options = { method: "GET", token: true };
   const { error, sendRequest } = useFetch();
   const transformData = (data) => {
      setData({
         ...data,
         match: useTitle(data.side, data.match),
         tooltip: handleTooltip(data.fixtures),
      });
   };

   useEffect(() => {
      let pusher = new Pusher(ws, {
         channelAuthorization: {
            headers: { Authorization: `Bearer ${localStorage.getItem("dinhotoken")}` },
            endpoint: `${URL}/auth`,
         },
         cluster: "eu",
      });

      let channel = pusher.subscribe(`private-${currentUser.user}`);
      channel.bind("new-message", function (data) {
         setData({
            ...data,
            match: useTitle(data.side, data.match),
            tooltip: handleTooltip(data.fixtures),
         });
      });
      return () => pusher.disconnect();
   }, []);

   useEffect(() => {
      if (!data || forceRefresh) {
         setForceRefresh(false);
         sendRequest(`/players?team=${team}`, options, transformData);
      }
   }, [forceRefresh]);

   useEffect(() => {
      if (!isRenderedFirstTime.current) {
         goToCurrentBet();
      }
      if (data && isRenderedFirstTime) isRenderedFirstTime.current = false;
   }, [data?.current]);

   const changeBet = (e) => {
      const betPlayerName = e.currentTarget.dataset.player_name;
      const betPlayerId = Number(e.currentTarget.id);
      const optionsNewBet = {
         method: "POST",
         token: true,
         undefined,
         body: JSON.stringify({ player: betPlayerId }),
      };
      toast({
         message: `${applanguage.betAlerts.bet} ${betPlayerName}. \r\n${applanguage.betAlerts.info}`,
         position: "center",
         duration: 2500,
         type: "is-info",
      });
      sendRequest(`/bet`, optionsNewBet, function transformBet(data) {});
   };

   const goToCurrentBet = () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
         const currentBet = document.getElementById(data.current);
         currentBet.scrollIntoView({ block: "center", behavior: "smooth" });
      }
   };

   const infoButtonsColor = (i) => {
      return i === 0
         ? "has-background-info"
         : i === 1
         ? "has-background-success"
         : "has-background-warning";
   };

   if (!data) return <LoadingButton />;

   return (
      <div className=''>
         <div className='has-text-centered my-4'>
            <p className='title is-size-3-mobile is-size-2-tablet'>
               {data.match}
               <span
                  className='icon has-tooltip-multiline has-tooltip-arrow 
						has-tooltip-left has-tooltip-info has-text-info mx-2'
                  data-tooltip={data.tooltip}
               >
                  <i className='fas fa-calendar icon is-small' aria-hidden='true' />
               </span>
            </p>
            <p className='title is-size-4-mobile is-size-3-tablet'>
               {applanguage.betTitle.points1}
               <strong className='has-text-weight-bold'>{` ${data.pool.toLocaleString(
                  "sk-SK"
               )} `}</strong>
               {applanguage.betTitle.points2}
            </p>
            <TimeComponent
               start={data.start}
               language={applanguage.betTitle.time}
               forceRefresh={setForceRefresh}
            />
         </div>

         <div className='buttons is-centered mb-4 mt-2'>
            {applanguage.betButtons.map((button, i) => {
               const showButton =
                  data.players[0].status !== "unknown" ||
                  (data.players[0].status === "unknown" && i !== 1 && i !== 2);
               return (
                  showButton && (
                     <button
                        key={button}
                        className={`button has-text-weight-bold is-hovered m-2 is-active
								is-size-8-mobile is-size-6-tablet is-size-6-desktop ${infoButtonsColor(i)}`}
                        onClick={i === 0 ? goToCurrentBet : null}
                     >
                        {button}
                     </button>
                  )
               );
            })}
         </div>

         <div className='columns is-mobile is-centered is-multiline is-gapless'>
            {data.players.map((player) => (
               <CardComponent
                  key={`card-${player.name}`}
                  current={data.current}
                  pool={data.pool}
                  player={player}
                  changeBet={changeBet}
               />
            ))}
         </div>
      </div>
   );
};

export default BettingPage;
