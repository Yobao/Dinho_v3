import React, { useState, useEffect, useContext, useRef } from "react";
import { LanguageContext } from "../../store/user-context";
import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";

const HomePage = () => {
   const { applanguage, setApplanguage } = useContext(LanguageContext);
   const text = applanguage.homeTitle;
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      let timer = setTimeout(() => {
         setIsLoading(false);
      }, 800);

      return () => {
         clearInterval(timer);
      };
   });

   return (
      <React.Fragment>
         <div className='column is-centered has-text-centered is-mobile is-7-desktop home-width'>
            <h1 className='title is-size-4-mobile is-size-3-tablet is-size-3-desktop'>
               {applanguage.homeTitle.welcome}
            </h1>
            <br />
            <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>
               {applanguage.homeTitle.info1}
            </h3>
            <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>
               {applanguage.homeTitle.info2}
            </h3>
            <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>
               {applanguage.homeTitle.info3}
            </h3>
            <h3 className='title is-size-6-mobile is-size-5-tablet is-size-5-desktop'>
               {applanguage.homeTitle.info4}
            </h3>
            <br />

            <div className='column'>
               <iframe
                  src='https://flo.uri.sh/visualisation/10156801/embed'
                  title='Interactive or visual content'
                  className='flourish-embed-iframe'
                  frameBorder='0'
                  scrolling='no'
                  style={{
                     width: "100%",
                     height: "35em",
                  }}
                  sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
               ></iframe>
            </div>

            <br />
            <br />
            <h2 className='title is-size-4-mobile is-size-3-tablet is-size-3-desktop'>
               {applanguage.homeTitle.example}
            </h2>

            <figure className='image is-inline-block column'>
               <img
                  src={applanguage.homeTitle.rules}
                  className=''
                  onLoad={() => setIsLoading(false)}
                  style={!isLoading ? {} : { display: "none" }}
               />
            </figure>
         </div>
      </React.Fragment>
   );
};

export default HomePage;
