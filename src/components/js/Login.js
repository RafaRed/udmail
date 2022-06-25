import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import injectSheet from "react-jss";
import { injected, walletconnect, uauth, uauth2 } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import "../css/Login.css"
import { createUdAccount } from "../../model/Calls/Database";

function Login(props) {
	const [isConnected, setIsConnected] = useState(false);
	const [domain, setDomain] = useState("");
	fetchData(isConnected, setDomain, setIsConnected);
	const [udLoginState, setUdLoginState] = useState(0);
	return isConnected ? (
		<div className="username">
			<div className="login-text">{domain}</div>
			<img
				src={getUdLoginButtonLogged(udLoginState)}
				onMouseOver={() => setUdLoginState(1)}
				onMouseLeave={() => setUdLoginState(0)}
				onMouseDown={() => setUdLoginState(2)}
				onClick={() => logout(props.web3ReactHook,setIsConnected,setDomain)}
			/>
			
			
		</div>
	) : (
		<img
			src={getUdLoginButton(udLoginState)}
			onMouseOver={() => setUdLoginState(1)}
			onMouseLeave={() => setUdLoginState(0)}
			onMouseDown={() => setUdLoginState(2)}
			className={["ud-login", props.classes.udLogin].join(" ")}
			onClick={() => connectUnstoppable(props.web3ReactHook)}
		/>
	);
}

function getUdLoginButton(state) {
	switch (state) {
		case 0:
			return "/images/login/ud.png";
		case 1:
			return "/images/login/ud-hover.png";
		case 2:
			return "/images/login/ud-pressed.png";
	}
}

function getUdLoginButtonLogged(state) {
	switch (state) {
		case 0:
			return "/images/login/ud-logged.png";
		case 1:
			return "/images/login/ud-logged-hover.png";
		case 2:
			return "/images/login/ud-logged-pressed.png";
	}
}

function withUseWeb3React(Component) {
	return function WrappedComponent(props) {
		const values = useWeb3React();
		return <Component {...props} web3ReactHook={values} />;
	};
}

async function connectUnstoppable(web3ReactHook) {
	injected.deactivate();
	//setOpen(false);
	web3ReactHook
		.activate(uauth, null, true)

		.then(async (res) => {
			uauth
				.getAccount()

				.then((account) => {
					uauth.uauth.user().then((user) => {
						createUdAccount(user.sub).then(() => {
							window.location.href = "/mail";
						});
						
					});
				})
				.catch((e) => {
					alert(e);
					console.error(e);
				});
		})
		.catch((e) => {
			alert(e);
			console.error(e);
		});
}

function fetchData(isConnected, setDomain, setIsConnected) {
	uauth2.uauth
		.user()
		.then((data) => {
			if (data) {
				if (isConnected === false) {
					setIsConnected(true);
					setDomain(data.sub);
				}
			} else {
			}
		})
		.catch((_err) => {});
}

function logout(web3ReactHook, setIsConnected, setDomain) {
	setIsConnected(false);
	setDomain("");
	uauth2.uauth.logout();
	web3ReactHook.deactivate();
	injected.deactivate();
	uauth.deactivate();
	localStorage.clear();
	window.location.reload(false);
}

const styles = {
	dropdownContent: {
		"&:hover": {
			display: "block",
		},
	},
	dropdown: {
		"&:hover": {
			backgroundColor: "#3e8e41",
		},
	},
};

export default injectSheet(styles)(withUseWeb3React(Login));
