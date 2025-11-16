import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

// Firebase config (provided)
const firebaseConfig = {
  apiKey: 'AIzaSyC1IWoiy3tVhMx9YZ4pM83h6Fqe9I4taBk',
  authDomain: 'bartinarge-9f891.firebaseapp.com',
  projectId: 'bartinarge-9f891',
  storageBucket: 'bartinarge-9f891.firebasestorage.app',
  messagingSenderId: '930246890178',
  appId: '1:930246890178:web:4434732d4a50e9c78ce15b',
  measurementId: 'G-7Z42REK2J8',
}

export default boot(({ app }) => {
  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)

  // Enable offline persistence for better offline experience
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open')
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available in this browser')
    } else {
      console.warn('Firestore persistence error:', err)
    }
  })

  // Expose to Vue app and window for convenience
  app.config.globalProperties.$firebase = { auth, db }
  app.config.globalProperties.$user = null
  window.$firebase = { auth, db }
  window.$user = null

  onAuthStateChanged(auth, (user) => {
    app.config.globalProperties.$user = user
    window.$user = user
  })
})
