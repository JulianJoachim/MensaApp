import React, { useState, useEffect } from "react";
import About from "./pages/about.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Speisen from "./pages/speisen.jsx";
import Contact from "./pages/contact.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import Profilesetting from "./pages/profile-settings.jsx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(function(users) {
      if (users) {
        console.log()
        setUser(users);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <div>
          <nav className="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
            <img
              id="logo"
              src="https://cdn.glitch.com/84f6c85c-8257-49f7-8aa8-2f1d856d0e42%2FMensa%20App%20Logo%20V1%20White.png?v=1632162749746"
            />

            <Link
              to="/"
              className="w3-bar-item w3-button w3-padding-large w3-hover-black"
              onClick={() =>
                (document.getElementById("Untertitel").innerHTML = "Startseite")
              }
            >
              <i className="fa fa-home w3-xxlarge"></i>
              <p>Home</p>
            </Link>

            <Link
              to="/speisen"
              className="w3-bar-item w3-button w3-padding-large w3-hover-black"
              onClick={() =>
                (document.getElementById("Untertitel").innerHTML = "Speiseplan")
              }
            >
              <i className="fa fa-eye w3-xxlarge"></i>
              <p>Speisen</p>
            </Link>
            <Link
              to="/contact"
              className="w3-bar-item w3-button w3-padding-large w3-hover-black"
              onClick={() =>
                (document.getElementById("Untertitel").innerHTML = "Kontakt")
              }
            >
              <i className="fa fa-envelope w3-xxlarge"></i>
              <p>Kontakt</p>
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="w3-bar-item w3-button w3-padding-large w3-hover-black"
              >
                <i
                  className="fa fa-user-circle"
                  style={{ fontSize: "36px" }}
                ></i>
                <p>Profile</p>
              </Link>
            ) : (
              <Link
                to="/login"
                className="w3-bar-item w3-button w3-padding-large w3-hover-black"
              >
                <i
                  className="fa fa-user-circle"
                  style={{ fontSize: "36px" }}
                ></i>
                <p>Login</p>
              </Link>
            )}
          </nav>

          <div className="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
            <div className="w3-bar w3-black w3-opacity w3-hover-opacity-off w3-center w3-small">
              <Link
                to="/"
                className="w3-bar-item w3-button"
                id="homebutton"
                onClick={() =>
                  (document.getElementById("Untertitel").innerHTML =
                    "Startseite")
                }
              >
                Home
              </Link>

              <Link
                to="/speisen"
                className="w3-bar-item w3-button"
                id="speisen"
                onClick={() =>
                  (document.getElementById("Untertitel").innerHTML =
                    "Speiseplan")
                }
              >
                Speisen
              </Link>
              <Link
                to="/contact"
                className="w3-bar-item w3-button"
                id="contact"
                onClick={() =>
                  (document.getElementById("Untertitel").innerHTML = "Kontakt")
                }
              >
                Kontakt
              </Link>

              {user ? (
                <Link
                  to="/profile"
                  className="fa fa-user-circle w3-bar-item w3-button"
                  style={{ fontSize: "18px" }}
                  id="homebutton"
                ></Link>
              ) : (
                <Link
                  to="/login"
                  className="fa fa-user-circle w3-bar-item w3-button"
                  style={{ fontSize: "18px" }}
                  id="homebutton"
                ></Link>
              )}
            </div>
          </div>
        </div>

        <div className="w3-padding-large" id="main">  
          <header
            className="w3-container w3-padding-32 w3-center w3-black"
            id="home"
          >
            <h1>
              <span className="w3-jumbo w3-hide-small">Mensa Impact</span>
              <br className="w3-hide-small"></br>
              <span id="Untertitel" className="w3-jumboWhenSmall"></span>
            </h1>
            <p></p>
          </header>

          <div className="w3-content">
            <Switch>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>e
               <Route path="/setting">
                <Profilesetting />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/speisen">
                <Speisen />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}
