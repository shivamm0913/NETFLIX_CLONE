import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDBiyFn3ucS_kVyDNUaWH0Kk0QSGY_e0Aw",
  authDomain: "netflix-clone-dd27e.firebaseapp.com",
  projectId: "netflix-clone-dd27e",
  storageBucket: "netflix-clone-dd27e.firebasestorage.app",
  messagingSenderId: "347108552805",
  appId: "1:347108552805:web:1940e16d7be8b5751e568c"
};

const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);

const signup = async (name , email , password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth , email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
      uid:user.uid,
      name,
      authProvider:"local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
try {
   await  signInWithEmailAndPassword(auth, email,password )
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
} 

const logout = async()=>{
      signOut(auth);
}

export{ auth , login , db , signup , logout }