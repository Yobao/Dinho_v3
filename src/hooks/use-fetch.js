import React, { useState, useCallback } from "react";
import { URL } from "../store/data";
//In order to make hook work, it is neccessary to create requestConfig object which will contain
//request url as well as request header in the component where we want to fetch data.

const useFetch = () => {
   const [error, setError] = useState(null);
   const [isAuth, setIsAuth] = useState(null);

   function RequestOptions(r_method, token = false, accept = false, body) {
      (this.method = r_method),
         (this.body = body ? body : null),
         //(this.mode = "cors"),
         (this.headers = {
            ...(token && {
               Authorization:
                  token === true
                     ? `Bearer ${localStorage.getItem("dinhotoken")}`
                     : `Bearer ${token}`,
            }),
            ...(accept && { accept: "application/json" }),
            //"content-type": "application/x-www-form-urlencoded",
            "content-type": "application/json",
         });
   }

   const sendRequest = useCallback(async (path, options, applyData) => {
      const reqOptions = new RequestOptions(...Object.values(options));
      try {
         const response = await fetch(URL + path, { ...reqOptions }).then((res) => {
            if (!res.ok) {
               throw new Error(res.status);
            }
            return res;
         });
         const data = await response.json();

         if (data) applyData(data);
      } catch (err) {
         applyData(Number(err.message));
         setError(err.message);
      }

      if (path.slice(-9) === "autologin") setIsAuth(true);
   }, []);

   return {
      error,
      sendRequest,
      isAuth,
   };
};

export default useFetch;
