import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config={
    apiKey: "AIzaSyAL8Pexg6M-6aNA6bVBcvSsdDcOuoVPC1k",
    authDomain: "fashion-point-db.firebaseapp.com",
    databaseURL: "https://fashion-point-db.firebaseio.com",
    projectId: "fashion-point-db",
    storageBucket: "",
    messagingSenderId: "960538226179",
    appId: "1:960538226179:web:e5e94c999c92c592"
  };

  export const createUserProfileDocument=async(userAuth,additionalData)=>{
  
  if(!userAuth)return;

  const userRef=firestore.doc(`users/${userAuth.uid}`);

  const snapshot=await userRef.get();

 if(!snapshot.exists)
 {
    const {displayName,email}=userAuth;
    const createdAt=new Date();

    try{

      await userRef.set({displayName,email,createdAt,...additionalData})

    }
    catch(error)
    {
      console.log(error.message);
    }
 }

 return userRef;


  }

  firebase.initializeApp(config);

  export const auth=firebase.auth();

  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt:'select_account'});

  export const SignInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;