import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5E_laxVZgfbcIO9OY2Fcw0rjL315w4Ic",
  authDomain: "invoice-app-6adb2.firebaseapp.com",
  projectId: "invoice-app-6adb2",
  storageBucket: "invoice-app-6adb2.appspot.com",
  messagingSenderId: "212605413153",
  appId: "1:212605413153:web:1dde09d49a8e26cb510060"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore }