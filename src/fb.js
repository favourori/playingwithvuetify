// Initialize Firebase
import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBt-QFORdXZ5tBex_3AayJW7YkjcpajfjU",
  authDomain: "taskmanager-f94b6.firebaseapp.com",
  databaseURL: "https://taskmanager-f94b6.firebaseio.com",
  projectId: "taskmanager-f94b6",
  storageBucket: "taskmanager-f94b6.appspot.com",
  messagingSenderId: "134031372221"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
