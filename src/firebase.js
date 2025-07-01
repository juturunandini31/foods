import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgRQr3I2cwhhF9yU0u51rSTbWvnKMgFOU",
  authDomain: "yral-foods-web.firebaseapp.com",
  projectId: "yral-foods-web",
  storageBucket: "yral-foods-web.firebasestorage.app",
  messagingSenderId: "1026410307165",
  appId: "1:1026410307165:web:a6794144259fe6fa4df7b4",
  measurementId: "G-L08694P3M8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// If you need to use `app` elsewhere, you can also export it:
// export { app }; 