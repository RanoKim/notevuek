/**
 * Created by daesubkim on 10/11/17.
 */
import Firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDockrwlPsKMNVG4_a3y-EchiIyfs-BGTQ",
  authDomain: "notevuek-3b65a.firebaseapp.com",
  databaseURL: "https://notevuek-3b65a.firebaseio.com",
  projectId: "notevuek-3b65a",
  storageBucket: "",
  messagingSenderId: "922680629419"
}

const app = Firebase.initializeApp(config)
const db = app.database()
const notesRef = db.ref('notes') // notes Table에 CRUD 하는 객체

export default { app, db, notesRef }
