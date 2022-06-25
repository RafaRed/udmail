import "../css/App.css";
import Login from "../../components/js/Login";

function App() {
	return (
		<div className="App">
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

export default App;
