import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../css/Mail.css";
import { uauth2 } from "../../components/js/connectors";
import { getEmails } from "../../model/Calls/Database";

function Mail() {
	const [emails, setEmails] = useState([]);
	useEffect(() => {
		fetchEmails(setEmails);
	}, []);
	return (
		<>
			<Navbar />
			<div className="mail-box">
				<div className="top-bar">
					<p>Inbox</p>
					<button onClick={() => (window.location.href = "/sendmail")}>
						NEW MAIL
					</button>
				</div>
				<MailBox emails={emails}></MailBox>
			</div>
		</>
	);
}

function MailBox(props) {
	var emails = props.emails;
	var maillist = [];
	console.log(emails);
	if (emails !== undefined && emails !== null) {
		for (const [key, value] of Object.entries(emails)) {
			maillist.push(
				<div className="email" key={key} onClick={()=> window.location.href="/readmail/"+key}>
					<p className="from noselect">{emails[key].from.replace("*", ".")}</p>{" "}
					<p className="subject noselect">{emails[key].subject}</p>
				</div>
			);
		}
	}

	return <div className="mail-list">{maillist}</div>;
}

function fetchEmails(setEmails) {
	uauth2.uauth.user().then((user) => {
		getEmails(user.sub).then((emails) => {
			setEmails(emails);
		});
	});
}

export default Mail;
