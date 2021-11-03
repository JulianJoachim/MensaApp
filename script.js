var coll = document.getElementsByClassName("collapsible");
var mensaIdName = {};
var mensaIdAddress = {};
var mensaIdCity = {};
var mensaIdCoord = {};
var cid = "nicht gesetzt";
var mensaName = "";

//document.getElementById("getApi").addEventListener("click", httpGetAsync);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGetAsync() {
  var allMensa = [];
  var theUrl = "https://openmensa.org/api/v2/canteens";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      var response = JSON.parse(xmlHttp.responseText);
    for (var a in response) {
      if (response[a].city == "Berlin" || response[a].city == "Brandenburg") {
        allMensa.push([
          response[a].id,
          response[a].name,
          response[a].city,
          response[a].address,
          response[a].coordinates
        ]);
      }
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send();
  return allMensa;
}

function getMensaDateState(canteensid) {
  var theUrl = "https://openmensa.org/api/v2/canteens/" + canteensid + "/days";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      var response = JSON.parse(xmlHttp.responseText);
    for (var a in response) {
      if (response[a].closed == false) {
        console.log(
          "Die Mensa mit der ID = " +
            canteensid +
            " hat am " +
            response[a].date +
            " geöffnet"
        );
        getMensaMeal(canteensid, response[a].date);
      }
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send();
}

function getMensaMeal() {
  if (cid != "nicht gesetzt") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    var date = today;

    if (
      document.getElementById("mensadate").value == today ||
      document.getElementById("mensadate").value == ""
    ) {
      date = today;
    } else {
      console.log("Daten aus Datepicker werden übernommen");
      date = document.getElementById("mensadate").value;
    }

    clearMeallist();

    var preferredPrice = "students";
    console.log("Die mensa wurde selected: " + cid);
    var canteensid = 55;
    var allMensa = [];
    var counter = 1;

    var theUrl =
      "https://openmensa.org/api/v2/canteens/" +
      cid +
      "/days/" +
      date +
      "/meals";
    console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response = JSON.parse(xmlHttp.responseText);
        createTable();
        for (let a in response) {
          var tableRowTag = document.createElement("tr");
          tableRowTag.setAttribute("class", "collapsible");
          // var collapsedContent = document.createElement("p");
          // collapsedContent.setAttribute("class", "contentMeallist");
          // collapsedContent.innerHTML = "Content";

          tableRowTag.addEventListener("click", function() {
            document.getElementById("nameGericht").innerHTML = response[a].name;
            document.getElementById("inhaltsstoffeGericht").innerHTML =
              response[a].notes;
            document.getElementById("preisStudent").innerHTML =
              response[a].prices["students"] + " €";
            document.getElementById("preisAngestellter").innerHTML =
              response[a].prices["employees"] + " €";
            document.getElementById("preisAndere").innerHTML =
              response[a].prices["others"] + " €";
            document.getElementById("menu").style.display = "block";
          });

          var element = document.getElementById("mensaTable");
          element.appendChild(tableRowTag);
          // tableRowTag.appendChild(collapsedContent);

          var tag = document.createElement("td");
          var text = document.createTextNode(response[a].name);
          tag.appendChild(text);
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);

          var tag = document.createElement("td");
          var text = document.createTextNode(response[a].category);
          tag.appendChild(text);
          tag.style.borderTop = "medium solid black";
          tag.setAttribute("class", "w3-hide-small");
          tableRowTag.appendChild(tag);

          var tag = document.createElement("td");
          var text = document.createTextNode(
            response[a].prices[preferredPrice] + " €"
          );
          tag.appendChild(text);
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);

          var tag = document.createElement("td");
          var text = document.createTextNode(response[a].notes);
          tag.appendChild(text);
          tag.style.borderTop = "medium solid black";
          tag.setAttribute("class", "w3-hide-medium w3-hide-small");
          tableRowTag.appendChild(tag);

          var tag = document.createElement("span");
          tag.setAttribute("class", "fa fa-star checked");
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);
          var tag = document.createElement("span");
          tag.setAttribute("class", "fa fa-star checked");
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);
          var tag = document.createElement("span");
          tag.setAttribute("class", "fa fa-star checked");
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);
          var tag = document.createElement("span");
          tag.setAttribute("class", "fa fa-star checked");
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);
          var tag = document.createElement("span");
          tag.setAttribute("class", "fa fa-star checked");
          tag.style.borderTop = "medium solid black";
          tableRowTag.appendChild(tag);
          document.getElementById("speisenError").innerHTML = "";
        }
      } else {
        document.getElementById("speisenError").innerHTML =
          "Die ausgewählte Mensa ist an diesem Tag geschlossen.";
      }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send();
    return allMensa;
  } else {
    document.getElementById("speisenError").innerHTML =
          "Es wurde keine Mensa ausgewählt. Bitte navigiere zu Home und wähle deine gewünschte Mensa.";
  }
}

function clearMeallist() {
  document.getElementById("speisenError").innerHTML = "";
  parent = document.getElementById("mensaTable");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function createTable() {
  var tableRowTag = document.createElement("tr");

  var element = document.getElementById("mensaTable");
  element.appendChild(tableRowTag);
  // tableRowTag.appendChild(collapsedContent);

  var tag = document.createElement("th");
  var text = document.createTextNode("Produktbezeichnung");
  tag.appendChild(text);
  tag.style.borderTop = "medium solid black";
  tableRowTag.appendChild(tag);

  var tag = document.createElement("th");
  var text = document.createTextNode("Produkttyp");
  tag.appendChild(text);
  tag.style.borderTop = "medium solid black";
  tag.setAttribute("class", "w3-hide-small");
  tableRowTag.appendChild(tag);

  var tag = document.createElement("th");
  var text = document.createTextNode("Preis");
  tag.appendChild(text);
  tag.style.borderTop = "medium solid black";
  tableRowTag.appendChild(tag);

  var tag = document.createElement("th");
  var text = document.createTextNode("Extras");
  tag.appendChild(text);
  tag.style.borderTop = "medium solid black";
  tag.setAttribute("class", "w3-hide-medium w3-hide-small");

  tableRowTag.appendChild(tag);

  var tag = document.createElement("th");
  var text = document.createTextNode("Bewertung");
  tag.appendChild(text);
  tag.style.borderTop = "medium solid black";
  tableRowTag.appendChild(tag);
}

function addToDictionary(name, address, city, id, coords) {
  mensaIdName[name] = id;
  mensaIdAddress[id] = address;
  mensaIdCity[id] = city;
  mensaIdCoord[id] = coords;
}

function getInfo() {
  var array = []
  array.push(mensaIdCoord[cid][0]);
  array.push(mensaIdCoord[cid][1]);
  array.push(mensaName);
  array.push(mensaIdAddress[cid]);
  array.push(cid)
  return array;
}

function loadMensa() {
  mensaName = document.getElementById("mensaSelect").value;
  cid = mensaIdName[mensaName];

  console.log("Gewählte Mensa: " + cid);
}

function setCid(cidvalue){
  cid = cidvalue;
}