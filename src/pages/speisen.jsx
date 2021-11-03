import React from "react";

function handleClick() {
  document.getElementById("menu").style.display = "none";
}

function handleClick2() {
  document.getElementById("menu").style.display = "block";
}

function handleClick3() {
  const button = document.getElementById("notifications");
  button.addEventListener("click", () => {
    Notification.requestPermission().then(result => {
      if (result === "granted") {
        randomNotification();
      }
    });
  });
}

export default function Bewertung() {
  return (
    <>
      <div className="page">
        <div id="spHeader">
          <div id="spHeaderLeft">
            <h5 className="spTitle">Speiseplan von</h5>{" "}
            <h5 className="spTitle" id="mensaTitle">Mensa</h5>
          </div>
          <label>Datum wechseln</label>
          <div id="spHeaderRight">
            <input
              type="date"
              id="mensadate"

              min="2018-01-01"
              max="2021-10-31"
              className="spDate"
            ></input>
          </div>
        </div>
        <button onClick={getMensaMeal}>Speisen laden</button>
        <span id="speisenError"></span>

        <table id="mensaTable"></table>

        <div id="menu" className="w3-modal">
          <div className="w3-modal-content w3-animate-zoom">
            <div className="w3-container w3-black w3-display-container">
              <span
                onClick={handleClick}
                className="w3-button w3-display-topright w3-large"
              ></span>
              <h1>Beschreibung</h1>
            </div>
            <div className="w3-container">
              <h5 id="nameGericht"></h5>
              <h5>Inhaltsstoffe:</h5>
              <h5 id="inhaltsstoffeGericht"></h5>
            </div>
            <div className="w3-container w3-black">
              <h1>Preis</h1>
            </div>
            <div className="w3-container">
              <h5>
                Studenten: <b id="preisStudent"></b>
              </h5>
              <h5>
                Angestellte: <b id="preisAngestellter"></b>
              </h5>
              <h5>
                Andere: <b id="preisAndere"></b>
              </h5>
            </div>
            <div className="w3-container w3-black">
              <h1 id="bewertungGericht">Bewertung</h1>
            </div>
            <div className="w3-container">
              <div>
                <span className="heading">User Rating</span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star"></span>

                <p>0 average based on 0 reviews.</p>
                <hr />

                <div className="row">
                  <div className="side">
                    <div>5 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>150</div>
                  </div>
                  <div className="side">
                    <div>4 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-4"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>63</div>
                  </div>
                  <div className="side">
                    <div>3 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>15</div>
                  </div>
                  <div className="side">
                    <div>2 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>6</div>
                  </div>
                  <div className="side">
                    <div>1 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>20</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w3-container">
              <p>
                <input type="text" />
              </p>
              <p>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star "></span>
                <span className="fa fa-star"></span>
                <span> </span>
                <button onClick={handleClick3} className="w3-button w3-black">
                  Senden
                </button>
              </p>
            </div>
          </div>
        </div>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </div>
    </>
  );
}
