import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const githubProvider = new firebase.auth.GithubAuthProvider()

export { app, base, githubProvider };