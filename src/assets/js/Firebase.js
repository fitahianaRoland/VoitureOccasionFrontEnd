import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYlLruQ3juuAAk8Vg6JMuXQ5VTBce8bvg",
  authDomain: "upload-fichier.firebaseapp.com",
  projectId: "upload-fichier",
  storageBucket: "upload-fichier.appspot.com",
  messagingSenderId: "72509196475",
  appId: "1:72509196475:web:fb288d785ffd76a26dc19e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);