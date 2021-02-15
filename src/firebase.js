import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBsCna5gU-IeMDBrThLaTAGp-J78M9K9ok',
  authDomain: 'clone-8d872.firebaseapp.com',
  projectId: 'clone-8d872',
  storageBucket: 'clone-8d872.appspot.com',
  messagingSenderId: '93617326673',
  appId: '1:93617326673:web:ae84c992668d7835384670',
  measurementId: 'G-45CW988YB2',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebaseApp.auth()

export { db, auth }
