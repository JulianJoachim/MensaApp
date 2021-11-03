import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";

export default function Profilesetting() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if (user) {
        const emailresult = getAuth().currentUser.email;
        if (emailresult) {
          setUser(emailresult);
        }
      } else {
        
      }
    });
  }, []);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = data => {
    loginUser(data.emailLogin, data.passwordLogin);
    history.push("/");
  };
  
  return (
    <div className="wrapper">
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <div className="imgcontainer">
        <img
          src="https://cdn.glitch.me/f015ef12-6ad3-4fe3-8100-7523fe8017a0%2Fimg_avatar2.png?v=1633618275796"
          alt="Avatar"
          className="avatar"
        />
      </div>
      <h4 className="">Account settings</h4>

      <div>
        <div>
          <div>
            {" "}
            <label>Vorname</label> <input type="text" placeholder="Steve" />{" "}
          </div>
          <div>
            {" "}
            <label>Nachname</label> <input type="text" placeholder="Smith" />{" "}
          </div>
          <div>
            {" "}
            <label>Email Addresss</label>{" "}
            <input type="text" value={user} disabled/>
          </div>
        </div>

        <div>
          <div>
            {" "}
            <label>Handynummer</label>{" "}
            <input type="tel" placeholder="+1 213-548-6015" />{" "}
          </div>
          <br />
          <div id="lang">
            {" "}
            <label>Status </label>
            <select name="status" id="language">
              <option value="student" defaultValue>
                Student
              </option>
              <option value="Dozent">Dozent</option>
              <option value="gast">Gast </option>
            </select>
          </div>
        </div>
        <div className="buttonsettings">
          <button type="submit"className="savesettingbutton">Save</button>
          <button className="cancelsettingbutton">Cancel</button>
        </div>
      </div>
      </form>
    </div>
  );
}
