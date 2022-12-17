import React, { useEffect, useState } from "react";
import Ball from "../../assets/soccer_ball.png";

const BallsComponent = ({ ballsCount }) => {
   const [imageSize, setImageSize] = useState(
      window.matchMedia("(min-width: 1024px)").matches ? "is-24x24" : "is-16x16"
   );

   useEffect(() => {
      let resizeTimeout;
      const resize = () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(() => {
            setImageSize(
               window.matchMedia("(min-width: 1024px)").matches ? "is-24x24" : "is-16x16"
            );
         });
      };

      window.addEventListener("resize", resize);
      return () => {
         window.removeEventListener("resize", resize);
      };
   }, []);

   return (
      <div
         className='p-0 m-0 pl-4 has-text-left columns is-flex is-vcentered'
         style={{ display: "inline-block" }}
      >
         {Array.apply(null, { length: ballsCount })
            .map(Number.call, Number)
            .map((ball, i) => (
               <figure key={`ball-${i}`} className={`image ${imageSize}`}>
                  <img src={Ball} style={{ display: "inline" }} />
               </figure>
            ))}
      </div>
   );
};

export default BallsComponent;
