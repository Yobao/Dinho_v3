import React, { useEffect, useState } from "react";
import useFormatTime from "../../hooks/use-format-time";

const TimeComponent = ({ start, language, forceRefresh }) => {
   const { handleTime } = useFormatTime();
   const [distance, setDistance] = useState(null);

   useEffect(() => {
      let timer = setInterval(() => {
         const time = handleTime(start);
         if (time.diff === 0) forceRefresh(true);
         setDistance(time.time);
      }, 1000);
      return () => {
         clearInterval(timer);
      };
   }, [handleTime]);

   return (
      <p className='title is-size-4-mobile is-size-3-tablet'>{`${language} ${
         !distance ? handleTime(start).time : distance
      }`}</p>
   );
};

export default TimeComponent;
