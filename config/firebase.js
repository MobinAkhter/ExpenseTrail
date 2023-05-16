import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLBiFrF893BzanWIKgpBoZlddUhFnlur0",
  authDomain: "budgetify-e459b.firebaseapp.com",
  projectId: "budgetify-e459b",
  storageBucket: "budgetify-e459b.appspot.com",
  messagingSenderId: "1083510941741",
  appId: "1:1083510941741:web:c46b729d4f210fb7f530a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, "trips");
export const expensesRef = collection(db, "expenses");

export default app;
