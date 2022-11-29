import React, { useContext, useCallback } from "react";
import moment from "moment";
import { LanguageContext } from "../store/user-context";

const useFormatTime = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const timeText = applanguage.betTime;

   const setFormat = (time, timeKey, index, arr) => {
      const interpunction = () => {
         if (arr.length === 2 && index === 0) return ` ${timeText.interpunction} `;
         if (arr.length > 2) {
            if (index < arr.length - 2) return ", ";
            if (index === arr.length - 2) return ` ${timeText.interpunction} `;
         }
         return "";
      };

      if (time === 1) return `${time} ${timeText[timeKey].one}` + interpunction();
      if (time < 5) return `${time} ${timeText[timeKey].multiple1}` + interpunction();
      return `${time} ${timeText[timeKey].multiple2}` + interpunction();
   };

   const handleTime = useCallback((matchStart) => {
      // CONVERT TO LOCAL TIME
      /*       const testStart = moment.utc(matchStart);
      const test2 = moment.utc(testStart).toDate();
      const test3 = moment(test2).local().format(); */

      let start = moment.utc(matchStart);
      let currentTime = moment.utc().format();
      let diff = start.clone().diff(currentTime, "second");

      let diffDays = start.clone().diff(currentTime, "days");
      let diffHours = start.clone().subtract(diffDays, "day").diff(currentTime, "hours");
      let diffMinutes = start
         .clone()
         .subtract(diffDays, "day")
         .subtract(diffHours, "hour")
         .diff(currentTime, "minutes");

      const timeArray = [
         { value: diffDays, timeKey: "day" },
         { value: diffHours, timeKey: "hour" },
         { value: diffMinutes, timeKey: "minute" },
         { value: diff > 59 ? 0 : diff, timeKey: "second" },
      ];

      const finalTimeString = timeArray
         .filter((timePart) => {
            return timePart.value !== 0;
         })
         .map((timePart, i, arr) => {
            return setFormat(timePart.value, timePart.timeKey, i, arr);
         })
         .join("");

      return { time: finalTimeString, diff };
   }, []);

   return { handleTime };
};

export default useFormatTime;
