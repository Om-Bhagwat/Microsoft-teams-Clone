//* Import the firebase which we installed through
//! npm install firebase

import firebase from 'firebase';

//*Store all your apikey information genrated by the firebase for you in .env.local so that it is safe,
//* And you do not upload your key's to Github.

var firebaseconfig = {
    apiKey: "AIzaSyD5nxwPxuJ2ROq6oHZPc-w-6F2_w1_TClk",
    authDomain: "teams-login-system.firebaseapp.com",
    projectId: "teams-login-system",
    storageBucket: "teams-login-system.appspot.com",
    messagingSenderId: "517377583585",
    appId: "1:517377583585:web:9daa5a7974f387b8754aa0"
};

//*initliaze your Application and store it in a const variable so that we can export and use wherever needed.

const fire = firebase.initializeApp(firebaseconfig);

export default fire;

