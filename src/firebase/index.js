import firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVvS8q-GuNelSuQ-d9FX1cFtf2pDBN5cI",
  authDomain: "gallery-cb121.firebaseapp.com",
  projectId: "gallery-cb121",
  storageBucket: "gallery-cb121.appspot.com",
  messagingSenderId: "1007200944555",
  appId: "1:1007200944555:web:c96916d6bf140be70052ee",
  measurementId: "G-WHEHERKPXJ"
};

firebase.initializeApp(firebaseConfig);

const galleryFirestore = firebase.firestore();
const galleryStorage = firebase.storage();
const galleryAuth = firebase.auth();

const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

const firestoreArrayUnion = firebase.firestore.FieldValue.arrayUnion;
const firestoreArrayRemove = firebase.firestore.FieldValue.arrayRemove;

export { galleryFirestore, galleryStorage, galleryAuth, firebaseTimestamp, firestoreArrayUnion, firestoreArrayRemove };