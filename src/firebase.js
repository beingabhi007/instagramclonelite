import firebase from "firebase/app"
import 'firebase/storage'
import 'firebase/firestore';
require("firebase/auth")
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBxpnYZe8h4HMgn2M88V8K2EZ2moK1kv0Y",
    authDomain: "instagram-clone-292db.firebaseapp.com",
    databaseURL: "https://instagram-clone-292db.firebaseio.com",
    projectId: "instagram-clone-292db",
    storageBucket: "instagram-clone-292db.appspot.com",
    messagingSenderId: "1077561655702",
    appId: "1:1077561655702:web:015f511ce98a02ae6e5db7",
    measurementId: "G-3337FR1YL5"
  });

const db = firebaseApp.firestore();
const auth = firebaseApp.auth(); 
const storage = firebaseApp.storage();


export { db, auth, storage };

