import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBmkWgBjKnZ9nJUgyNo1XfG1lUMgCy5Zhs",
    authDomain: "movies-app-auth-d1100.firebaseapp.com",
    projectId: "movies-app-auth-d1100",
    storageBucket: "movies-app-auth-d1100.appspot.com",
    messagingSenderId: "302165602912",
    appId: "1:302165602912:web:37b762cb7ae49105c84905",
    measurementId: "G-YW0MNZSW5R"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();