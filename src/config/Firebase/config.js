import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDcbhtqdldnJERobakEk5QzJsXfLLrlVqc",
    authDomain: "institude-management-sys-cd2a2.firebaseapp.com",
    projectId: "institude-management-sys-cd2a2",
    storageBucket: "institude-management-sys-cd2a2.appspot.com",
    messagingSenderId: "406600886977",
    appId: "1:406600886977:web:5a51d61e5012286606c240",
    measurementId: "G-K4CL024X79"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)