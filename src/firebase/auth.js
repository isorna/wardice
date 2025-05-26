// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCknD4JiKTqF7r5kziJvvbGmazITXDd9uk',
  authDomain: 'wardice-club.firebaseapp.com',
  databaseURL: 'https://wardice-club.firebaseio.com',
  projectId: 'wardice-club',
  storageBucket: 'wardice-club.appspot.com',
  messagingSenderId: '500800989956',
  appId: '1:500800989956:web:6dfcfdd3bb2f610164fe51',
  measurementId: 'G-0YME1NL2VZ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app)

/**
 * Signs in the user with Google using a popup.
 * Logs the user object or error to the console.
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    // Store user token in session storage
    sessionStorage.setItem('token', token)
    // The signed-in user info.
    const user = result.user
    console.log('User signed in: ', user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.customData?.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.error('Error signing in with Google: ', errorCode, errorMessage, email, credential)
  }
}

/**
 * Signs out the current user.
 * Logs success or error to the console.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log('User signed out successfully.')
    // Remove user token from session storage
    sessionStorage.removeItem('token')
  } catch (error) {
    console.error('Error signing out: ', error)
  }
}

// Observer for user's sign-in state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid
    console.log('User is signed in. UID:', uid)
  } else {
    // User is signed out
    console.log('User is signed out.')
  }
})
