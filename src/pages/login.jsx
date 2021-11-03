import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../database.js";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = data => {
    loginUser(data.emailLogin, data.passwordLogin);
    history.push("/");
  };
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="imgcontainer">
          <img
            src="https://cdn.glitch.me/f015ef12-6ad3-4fe3-8100-7523fe8017a0%2Fimg_avatar2.png?v=1633618275796"
            alt="Avatar"
            className="avatar"
          />
        </div>

        <div className="container">
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Email Adresse eingeben"
            className="tEingabeFeld"
            {...register("emailLogin", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 80
            })}
          />

          <label>
            <b>Passwort</b>
          </label>
          <input
            type="password"
            placeholder="Passwort eingeben"
            className="tEingabeFeld"
            {...register("passwordLogin", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 80
            })}
          />

          <button type="submit">Login</button>
        </div>

        <div className="w3-center w3-bar ">
          <span id="loginError" className="w3-centered"></span>
        </div>

        <div>
          <span id="registerError" className="w3-centered"></span>
        </div>
        <div className="container">
          <Link to="/register">Registrieren</Link>
          <p></p>
          <Link to="/register">Password vergessen?</Link>
        </div>
      </form>
    </div>
  );
}
