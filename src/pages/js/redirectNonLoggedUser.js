import { uauth2 } from "../../components/js/connectors";

export function redirectNonLoggedUser() {
	uauth2.uauth.user().then((user) => {
	}).catch(() => {
		window.location.href = "/";
	});
}
