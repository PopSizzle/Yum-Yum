import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "./utils/yumyum-project3-firebase-adminsdk-3dmi8-7a523c5d45.json";

// web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyC4WzaDal1FpSI-eD8G3ZC1aRaLzmESkRo",
    authDomain: "yumyum-project3.firebaseapp.com",
    databaseURL: "https://yumyum-project3.firebaseio.com",
    projectId: "yumyum-project3",
    storageBucket: "yumyum-project3.appspot.com",
    messagingSenderId: "626985870428",
    appId: "1:626985870428:web:9374a6b0f4f085cdb63299",
    measurementId: "G-5CDMC2WGER"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //  firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  