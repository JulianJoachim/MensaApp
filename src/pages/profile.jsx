import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { logoutUser } from "../../database.js";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    logoutUser();
    history.push("/");
  };
  console.log(errors);

  return (
    <div>
      <div className="imgcontainer">
        <img
          src="https://cdn.glitch.me/f015ef12-6ad3-4fe3-8100-7523fe8017a0%2Fimg_avatar2.png?v=1633618275796"
          alt="Avatar"
          className="avatar"
        />
        <h4>Username</h4>
      </div>
      <div>
        <div className="profile-usermenu">
          <ul className="nav">
            <li>
              <Link to="/setting">Account-Einstellungen </Link>
            </li>
            <li>
              <Link to="/">Speise-Favoriten </Link>
            </li>
            <li>
              <Link to="/contact">Hilfe </Link>
            </li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <button type="submit">Logout</button>
        </div>
      </form>
    </div>
  );
}
