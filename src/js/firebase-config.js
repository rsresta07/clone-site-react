import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMwa-PqQuNr7wyY0nj2W19s7JZemPKLHo",
    authDomain: "yts-clone-site.firebaseapp.com",
    projectId: "yts-clone-site",
    storageBucket: "yts-clone-site.firebasestorage.app",
    messagingSenderId: "791598112945",
    appId: "1:791598112945:web:34868aab1c89e84787c290",
    measurementId: "G-M91RSPYFNT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);