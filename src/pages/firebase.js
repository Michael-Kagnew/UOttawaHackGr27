import firebase from 'firebase/app'

import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: pr,
    projectId: "uottahack-2021-ac0ee",
    storageBucket: "uottahack-2021-ac0ee.appspot.com",
    messagingSenderId: "277893846166",
    appId: "1:277893846166:web:f4677100f85f022f99deb7",
    measurementId: "G-H03L0173L6"
})