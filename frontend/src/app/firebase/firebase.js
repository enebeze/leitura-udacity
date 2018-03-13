import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

var config = {
  apiKey: "AIzaSyAPaRGh8ZZRtk5tZKjcp3UGpXntndBvNQI",
  authDomain: "leitura-udacity.firebaseapp.com",
  databaseURL: "https://leitura-udacity.firebaseio.com",
  projectId: "leitura-udacity",
  storageBucket: "leitura-udacity.appspot.com",
  messagingSenderId: "55407806530"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const firebaseUi = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

export { auth, firebaseUi, uiConfig };
