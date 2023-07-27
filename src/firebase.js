import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfWSAV1cncHfmY32bhCNXXgGo-ImVCajQ",
    authDomain: "react-recipes-e4b3f.firebaseapp.com",
    databaseURL: "https://react-recipes-e4b3f-default-rtdb.firebaseio.com",
    projectId: "react-recipes-e4b3f",
    storageBucket: "react-recipes-e4b3f.appspot.com",
    messagingSenderId: "1017045119326",
    appId: "1:1017045119326:web:f95b33e7c74c40efed1fcf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

