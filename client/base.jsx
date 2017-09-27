import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB0Unby6zW44nUYpkDXWRFMq6jHuWrcLLU",
  authDomain: "drawmythang.firebaseapp.com",
  databaseURL: "https://drawmythang.firebaseio.com",
  projectId: "drawmythang",
  storageBucket: "drawmythang.appspot.com",
  messagingSenderId: "494201803607"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
// const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { app, base };