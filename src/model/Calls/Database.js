import { create_ud_account_path, getemails_path, getemail_path, sendmessage_path, server } from "../repository";


export async function createUdAccount(username) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({username:username}),
	};
	return new Promise((resolve, reject) => {
		fetch(server + create_ud_account_path, requestOptions)
			.then((response) => response.json())
			.then((data) => resolve(data));
	});
}

export async function postSendMessage(username,to,subject,message) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({username:username,to:to,subject:subject,message:message}),
	};
	return new Promise((resolve, reject) => {
		fetch(server + sendmessage_path, requestOptions)
		.then((response) => response.json())
		.then((data) => resolve(data));
	});
}

export async function getEmails(username) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({username:username}),
	};
	return new Promise((resolve, reject) => {
		fetch(server + getemails_path, requestOptions)
		.then((response) => response.json())
		.then((data) => resolve(data));
	});
}

export async function getEmail(username,emailid) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({username:username,emailid:emailid}),
	};
	return new Promise((resolve, reject) => {
		fetch(server + getemail_path, requestOptions)
		.then((response) => response.json())
		.then((data) => resolve(data));
	});
}
