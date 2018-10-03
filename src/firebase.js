import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const config = {
  apiKey: 'AIzaSyD_oRuNrf1X_xElGcS7ZBFaX4D1b3XwFdo',
  authDomain: 'monk-video-share.firebaseapp.com',
  databaseURL: 'https://monk-video-share.firebaseio.com/',
  storageBucket: 'gs://monk-video-share.appspot.com'
}

firebase.initializeApp(config)

// GET STORAGE
const storage = firebase.storage()
// GET ROOT REF
const storageRef = storage.ref()
// END STORAGE

// GET DATABASE
const database = firebase.database()
// GET ROOT REF
const databaseRef = database.ref()
// END DATABASE

// GET AUTH
const auth = firebase.auth()
const Auth = firebase.auth.Auth
// END AUTH

const toArray = obj => {
  const arr = []
  for (const id in obj) {
    const objAux = {
      _id: id,
      ...obj[id]
    }
    arr.push(objAux)
  }
  return arr
}

const studentRef = databaseRef.child('student')
const teacherRef = databaseRef.child('teacher')

export {
  storageRef,
  databaseRef,
  auth,
  Auth,
  toArray,
  studentRef,
  teacherRef
}
