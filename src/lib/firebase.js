import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { writable } from 'svelte/store'

export const firebaseConfig = {
  apiKey: 'AIzaSyDwrzxnkzCCGu1RYFzMUuP2gR-qOIWgOk4',
  authDomain: 'insecurities-3bdfb.firebaseapp.com',
  projectId: 'insecurities-3bdfb',
  storageBucket: 'insecurities-3bdfb.appspot.com',
  messagingSenderId: '484524668724',
  appId: '1:484524668724:web:3918796daec4f0ff329761',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)

export const loggedIn = writable(false)

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedIn.set(true)
    console.log('im in')
  } else {
    loggedIn.set(false)
  }
})

export function logOut() {
  signOut(auth).then(() => {
    alert('logged out')
  })
}