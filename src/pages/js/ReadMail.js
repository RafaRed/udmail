import React,{useState,useEffect} from 'react'
import Navbar from "./Navbar";
import "../css/ReadMail.css"
import { useParams } from "react-router-dom";
import { uauth2 } from '../../components/js/connectors';
import { getEmail } from '../../model/Calls/Database';

function ReadMail() {
	const params = useParams();
	const [email,setEmail] = useState({})
	if(params.mailid == undefined){
		window.location.href = "/mail"
	}
	useEffect(()=>{
		fetchEmail(setEmail,params.mailid)
	},[])
    return (
		<div>
			<Navbar></Navbar>
			<div className="read-mail">
                <div className="mail-form">
                <div className="back-button" onClick={()=>window.location.href = "/mail"}>Back</div>
				<div className="mail-field">
					<p className="mail-label">Mail From</p>
					<input defaultValue={email.from} disabled></input>
				</div>
                <div className="mail-field">
					<p className="mail-label">Subject</p>
					<input defaultValue={email.subject} disabled></input>
				</div>
                <textarea rows="4" cols="50" defaultValue={email.message} disabled>
					
				</textarea>
                </div>
				
			</div>
		</div>
	);
}

function fetchEmail(setEmail,emailid){
	uauth2.uauth.user().then((user) => {
		getEmail(user.sub,emailid).then((email) => {
			if(email !== undefined && email.from !== undefined){
				email.from = email.from.replace("*",".") 
			}
			setEmail(email);
			
		});
	});
}

export default ReadMail