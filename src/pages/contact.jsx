import React from "react";
import { useForm } from "react-hook-form";

/* Inspired by https://react-hook-form.com/form-builder */

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
   <div>
    <div className="page">
      <h5>Bitte nutzen Sie dieses Formular um Kontakt mit uns aufzunehmen.</h5>
      <h5>Wir werden uns je nach Anliegen umgehend bei Ihnen melden.</h5>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="kontaktFeld">
          <label>Vorname</label>
          <p></p>
          <input
            type="text"
            placeholder="Vorname"
            className="tEingabeFeld"
            {...register("vorname", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 80
            })}
          />
        </div>
        <div className="kontaktFeld">
          <label>Nachname</label>
          <p></p>
          <input
            type="text"
            placeholder="Nachname"
            className="kontaktEingabeFeld"
            {...register("nachname", {
              required: true,
              max: 50,
              min: 1,
              maxLength: 100
            })}
          />
        </div>
        <div className="kontaktFeld">
          <label>Emailadresse</label>
          <p></p>
          <input
            type="email"
            placeholder="Email"
            className="kontaktEingabeFeld"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        <div className="kontaktFeld">
          <label>Thema</label>
          <p></p>
          <select
            className="kontaktEingabeFeld"
            {...register("betreff", { required: true })}
          >
            <option value="Feedback">Feedback</option>
            <option value="Verbesserungsvorschlag">
              Verbesserungsvorschlag
            </option>
            <option value="Problem mit Account">Problem mit Account</option>
            <option value="Problem mit Website">Problem mit Website</option>
            <option value="Problem mit Bezahlung">Problem mit Bezahlung</option>
          </select>
        </div>
        <div className="kontaktFeld">
          <label>Beschreibung</label>
          <p></p>
          <textarea
            className="kontaktEingabeFeldBeschreibung"
            {...register("beschreibung", { required: true })}
          />
        </div>
        <div className="kontaktFeld">
          <input type="submit" />
        </div>
      </form>
    </div>
    
    
    </div>
  );
}
