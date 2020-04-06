export const BASE_URL =  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://www.theremoteclerk.com/api/';

import * as firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyDcNZI6SYod4dvJbidQg8PTHNAPeVqkktQ",
    authDomain: "remoteclerk-2d41b.firebaseapp.com",
    databaseURL: "https://remoteclerk-2d41b.firebaseio.com",
    projectId: "remoteclerk-2d41b",
    storageBucket: "remoteclerk-2d41b.appspot.com",
    messagingSenderId: "493623585422",
    appId: "1:493623585422:web:afb2eb1f8504fa176877df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
export const CLIENT_ID = '493623585422-e20ghrmnkv1ohmp7e68l5ofgjgscb65u.apps.googleusercontent.com';
