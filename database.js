import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

console.log("iNSIDE THE DATAabAsE");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDQQpT7JrgqHBE7eILyIXafQcVdmceO2wk",
  authDomain: "mensaappgruppe11.firebaseapp.com",
  projectId: "mensaappgruppe11",
  storageBucket: "mensaappgruppe11.appspot.com",
  messagingSenderId: "377165670880",
  appId: "1:377165670880:web:87dfef261bd6a7b000a385",
  measurementId: "G-0HVLNQDVD0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var allId = [];
let db = firebase.firestore();

//mensas mit allen Mensas von der API "openmensa" füllen
var mensas = httpGetAsync();

export function loadDb() {
  //allId mit allen Mensa IDs aus unserer Datenbank füllen
  db.collection("mensa")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data().name);
        allId.push(doc.data().id);
      });
    });

  setTimeout(function() {
    for (var mensa = 0; mensa < mensas.length; mensa++) {
      addToDb(
        mensas[mensa][0],
        mensas[mensa][1],
        mensas[mensa][2],
        mensas[mensa][3],
        mensas[mensa][4]
      );
    }
  }, 1000);

  //setTimeout(function() {
  //  readAll();
  //}, 1000);
}

function addToDb(id, name, city, address, coordinates) {
  console.log(allId + " das sind alle IDs!");
  if (allId.includes(id)) {
    console.log("ID existiert bereits.");
  } else {
    db.collection("mensa")
      .add({
        id: Number(id),
        name: name,
        city: city,
        address: address,
        coordinates: coordinates
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }
}

export function registerUser(email, password) {
  console.log("In datenbank registriert! :)D)D)D)D)");

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("registerError").innerHTML = errorCode.substring(
        5
      );
    });
}

export function loginUser(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("loginError").innerHTML = errorCode.substring(5);
    });
}

export function logoutUser() {
  const auth = getAuth();
  signOut(auth);
}

export function readAll() {
  console.log("Removing mensa choices");
  parent = document.getElementById("mensaSelect");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
  db.collection("mensa")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        addToDictionary(
          doc.data().name,
          doc.data().address,
          doc.data().city,
          doc.data().id,
          doc.data().coordinates
        );
        var select = document.getElementById("mensaSelect");
        var element = document.createElement("option");
        element.textContent = doc.data().name;
        element.value = doc.data().name;
        select.appendChild(element);
      });
    });
}

// firebase.firestore.setLogLevel("debug");
