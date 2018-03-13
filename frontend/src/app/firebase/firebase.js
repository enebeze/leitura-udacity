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
  // callbacks: {
  //   signInSuccess: function(currentUser, credential, redirectUrl) {
  //     return false;
  //   }
  // },
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

export { auth, firebaseUi, uiConfig };
