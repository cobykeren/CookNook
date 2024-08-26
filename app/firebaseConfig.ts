// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAIVqiiG2M_h9lxNlm8XMjDZxVvqMVGXg",
  authDomain: "cooknook-b5441.firebaseapp.com",
  projectId: "cooknook-b5441",
  storageBucket: "cooknook-b5441.appspot.com",
  messagingSenderId: "820113991556",
  appId: "1:820113991556:web:c463088fd0c7ed85635fd1",
  measurementId: "G-PV1SJJLC09",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
