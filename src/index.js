import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";

//ReactDOM.render(<App />, document.getElementById("root"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/*' element={<App />} />
			<Route path={`/changepassword/*`} element={<p>Change PWD!</p>} />
		</Routes>
	</BrowserRouter>
);
