const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase-admin/app");
const responseTime = require("response-time");
var admin = require("firebase-admin");
var serviceAccount = require("./config.json");
const rateLimit = require("express-rate-limit");


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://udmailapp-default-rtdb.firebaseio.com",
});

//initializeApp();
var db = admin.database();

const app = express();
app.use(cors());
app.use(responseTime());
app.use(
	rateLimit({
		windowMs: 1 * 60 * 60 * 1000, // 12 hour duration in milliseconds
		max: 300,
		message: "You exceeded requests hour limit!",
		headers: true,
	})
);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.post("/create-ud-account", (req, res) => {
	var _username = req.body.username.replace(".","*");
	console.log(_username)
    var ref = db.ref("/users/"+_username);
		ref.once("value", function (snapshot) {
			var data = snapshot.val();
			if (data === null) {
                ref.set({
                    timestamp: Date.now(),
                });
                res.send({"response":"user "+_username+" created."})
				
			} else {
				res.send({"response":"user "+_username+" logged in."})
			}
		});
});


app.post("/sendmessage", (req, res) => {
	console.log(req.body)
	var _username = req.body.username.replace(".","*");
	var _to = req.body.to.replace(".","*");
	var _subject = req.body.subject;
	var _message = req.body.message;
    var ref = db.ref("/mails/");

	var mailSent = ref.push({
		from:_username,
		to:_to,
		subject: _subject,
		message:_message,
		timestamp:Date.now()
	});

	var mailKey = mailSent.key;

	var refSend = db.ref("/mails-send/"+_username+"/");
	refSend.update({
		[mailKey]:{"to":_to, "subject":_subject,timestamp:Date.now()},
	});

	var refReceived = db.ref("/mails-received/"+_to+"/");
	refReceived.update({
		[mailKey]:{"from":_username, "subject":_subject, timestamp:Date.now()},
	});

	
	res.send({"response":"mail send."})
});


app.post("/getemails", (req, res) => {
	var _username = req.body.username.replace(".","*");
    var ref = db.ref("/mails-received/"+_username);
		ref.once("value", function (snapshot) {
			var data = snapshot.val();
			if (data === null) {
                res.send({})
				
			} else {
				res.send(data)
			}
		});
});

app.post("/getemail", (req, res) => {
	var _username = req.body.username.replace(".","*");
	var _emailid = req.body.emailid;
    var ref = db.ref("/mails/"+_emailid);
		ref.once("value", function (snapshot) {
			var data = snapshot.val();
			if (data === null) {
                res.send({})
				
			} else {
				res.send(data)
			}
		});
});




exports.app = functions.https.onRequest(app);