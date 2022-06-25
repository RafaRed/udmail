import React,{useState} from "react";
import Navbar from "./Navbar";
import "../css/SendMail.css"
import { uauth2 } from "../../components/js/connectors";
import { postSendMessage } from "../../model/Calls/Database";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { redirectNonLoggedUser } from "./redirectNonLoggedUser";

function SendMail() {

	const [to,setTo] = useState("")
	const [subject,setSubject] = useState("")
	const [message,setMessage] = useState("")
	
	return (
		<div>
			{redirectNonLoggedUser()}
			<Navbar></Navbar>
			<div className="send-mail">
                <div className="mail-form">
                <div className="back-button" onClick={()=>window.location.href = "/mail"}>Back</div>
				<div className="mail-field">
					<p className="mail-label">Mail To</p>
					<input type="text" placeholder="unstoppabledomain-mail.crypto" onChange={(e) => setTo(e.target.value)}></input>
				</div>
                <div className="mail-field">
					<p className="mail-label">Subject</p>
					<input type="text" onChange={(e) => setSubject(e.target.value)}></input>
				</div>
                <textarea rows="4" cols="50" onChange={(e) => setMessage(e.target.value)}/>
				<div className="send-line">
					<button className="send-button" onClick={()=>sendMessage(to,subject,message)}>SEND</button>
				</div>
                </div>
			</div>
		</div>
	);
}



function sendMessage(to,subject,message){
	uauth2.uauth.user().then((user) => {
		postSendMessage(user.sub,to,subject,message).then(()=>{
			window.location.href = "/mail"
		})
	});
}

export default SendMail;
