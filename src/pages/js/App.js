import "../css/App.css";
import Login from "../../components/js/Login";
import React, { useState } from "react";
import { uauth2 } from "../../components/js/connectors";

function App() {
	
	return (
		<div className="App">
			{isLoggedIn()}
			<div className="wrapper">
				<div className="title">
					<p className="main-title">WELCOME</p>
					<p className="main-title">TO</p>
					<div className="brand-title">
						<p>
							UD<span>mail</span>
						</p>
					</div>
					<p className="login-tip">Login to start using it.</p>
					<Login/>
				</div>
			</div>
		</div>
	);
}

function isLoggedIn() {
	uauth2.uauth.user().then((user) => {
		window.location.href="/mail"
	}).catch(()=>{
		return false;
	});
	return false;
}

export default App;
