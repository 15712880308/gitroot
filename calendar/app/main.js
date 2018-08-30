import React from "react";
import Reactdom from "react-dom";
import App from "./containers/App.js";


Reactdom.render(
	<div>
		<App></App>
	</div>,
	document.getElementById("app")
);