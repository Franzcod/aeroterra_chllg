navigator.geolocation.getCurrentPosition(success, error);

const my_localization = {
  latitude: "",
  longitude: "",
};

let store = [
  {
    nombre: "Casa Rosada",
    direccion: "Balcarce 50",
    coordenadas: "-34.608248, -58.370115",
    telefono: "011-111-111",
    categoria: "Casa de Gobierno",
  },
  {
    nombre: "Sheraton Hotel",
    direccion: "calle 123",
    coordenadas: "-34.599143, -58.376498",
    telefono: "011-111-111",
    categoria: "Hotel",
  },
];

function success(pos) {
  var crd = pos.coords;
  my_localization.latitude = Number(crd.latitude.toFixed(2));
  my_localization.longitude = Number(crd.longitude.toFixed(2));
  //   console.log(my_localization);
}

function error(err) {
  alert("ERROR(" + err.code + "): " + err.message);
  console.warn("ERROR(" + err.code + "): " + err.message);
}

var map = L.map("map", {
  center: [-34.60772172145942, -58.37041396110046],
  zoom: 13,
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZnJhbnpjb2QiLCJhIjoiY2wxc2pueWhzMXA0MzNjbW9mOG0yd3YwaCJ9.YVBL_DzJfzy6R73ssn0vbw",
  }
).addTo(map);

function onMapClick(e) {
  //   console.log(e.latlng);
  alert("You clicked the map at " + e.latlng);
}

map.on("click", onMapClick);

window.onload = function () {
  store.forEach(function (element) {
    var marker = L.marker([
      element.coordenadas.split(",")[0],
      element.coordenadas.split(",")[1],
    ]).addTo(map);
    marker.bindPopup(
      `<b>Nombre:</b><span> ${element.nombre} <br/><b>Dirección:</b><span> ${element.direccion} <br/><b>Teléfono:</b><span> ${element.telefono} <br/><b>(X,Y):</b><span> ${element.coordenadas} <br/> <b>Categoría:</b><span> ${element.categoria} <br/>`
    );
  });
};

let btn_mi_ubicacion = document.getElementById("btn_myLocation");
btn_mi_ubicacion.addEventListener("click", function () {
  let circle = L.circle([-34.50676, -58.762994], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  circle.bindPopup("Estoy por aqui.");
});

const btn_search = document.getElementById("btn_search");

btn_search.addEventListener("click", function () {
  const nombre = document.getElementsByClassName("form-control")[0].value;
  const direccion = document.getElementsByClassName("form-control")[1].value;
  const telefono = document.getElementsByClassName("form-control")[2].value;

  const categoria = document.getElementsByClassName("form-control-select")[0]
    .value;
  const coordenadas = document.getElementsByClassName("form-control")[3].value;

  if (
    nombre == "" ||
    direccion == "" ||
    telefono == "" ||
    categoria == "" ||
    coordenadas == ""
  ) {
    return alert("Complete todos los campos");
  }

  let lugar = {
    nombre: nombre,
    direccion: direccion,
    telefono: telefono,
    categoria: categoria,
    coordenadas: coordenadas,
  };

  console.log(lugar);

  let circle = L.marker(
    [Number(coordenadas.split(",")[0]), Number(coordenadas.split(",")[1])],
    {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }
  ).addTo(map);
  const popup = `<b>Nombre:</b><span> ${nombre} <br/><b>Dirección:</b><span> ${direccion} <br/><b>Teléfono:</b><span> ${telefono} <br/><b>(X,Y):</b><span> ${coordenadas} <br/> <b>Categoría:</b><span> ${categoria} <br/>`;
  circle.bindPopup(popup);

  //   store.push(lugar);
});
