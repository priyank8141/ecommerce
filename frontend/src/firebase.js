import firebase from "firebase";
import "firebase/auth";


// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBGre3nOE7PQdBV1r53KpGXYmIbkNBYtLw",
    authDomain: "ecommerce-1b379.firebaseapp.com",
    projectId: "ecommerce-1b379",
    storageBucket: "ecommerce-1b379.appspot.com",
    messagingSenderId: "659087490037",
    appId: "1:659087490037:web:0744bef22a3d22accabebc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  // export const googleAuthProvider = new firebase.auth.googleAuthProvider();

  export var googleAuthProvider = new firebase.auth.GoogleAuthProvider();