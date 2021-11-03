import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from "google-map-react";
import { readAll, loadDb } from "../../database.js";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default function Home() {
const [map, setMap] = useState({ lat:52.4931  , lng: 13.5263, name: "Mensa HTW Treskowallee", adresse: "Treskowallee 8, 10318 Berlin", id: 30});
useEffect(() =>{
 const dataFromLocalStorage = localStorage.getItem("cordMap")
 if(dataFromLocalStorage){
   setMap(JSON.parse(dataFromLocalStorage))
 } 
}, [setMap])
  
useEffect(() =>{
localStorage.setItem("cordMap",JSON.stringify(map))
}, [map])
  
  
    
  function setLatLng() {
    const mensainfo = getInfo();
    if (mensainfo != null) {
      setMap({ ...map, ['lat'] : mensainfo[0], ['lng'] : mensainfo[1], ['name'] :mensainfo[2], ['adresse'] :mensainfo[3], ['id'] :mensainfo[4]})
      location.reload(); 
    } else {
    }
  };

  const defaultProps = {
    center: {
      lat: map.lat,
      lng: map.lng
    },
    zoom: 15
  };
  
 setCid(map.id);

  return (
    // Important! Always set the container height explicitly

    <div>
      <p>Standort der Mensa</p>
      <div id="location">
        <div id="mapmensa">
          <GoogleMapReact
            bootstrapURLKeys={"AIzaSyDCbMRRJ0SdWIg5utHOYNUd2mATH68DMuc"}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={map.lat} lng={map.lng} text="Mensa Location" />
          </GoogleMapReact>
        </div>
        <div id="infomensa">
          <p id="homeMensaName">{map.name}</p>
          <p id="homeMensaAddress"> {map.adresse}</p>
          <button onClick={readAll}>Mensen laden</button>
          <button onClick={loadDb}>
            Datenbank füllen / aktualisieren (Nur im "Notfall" drücken!)
          </button>
          <button
            onClick={() => {
              loadMensa();
              setLatLng();
            }}
          >
            Mensa wählen
          </button>
          <form id="mensaForm">
            <select id="mensaSelect">
              <option>Wähle deine Mensa aus</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}
