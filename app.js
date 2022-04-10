navigator.geolocation.getCurrentPosition(success, error);

const my_localization = {
  latitude: "",
  longitude: "",
};

let store = [];

// Json con los datos de base de datos
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => (store = jsondata.store));

function success(pos) {
  var crd = pos.coords;
  my_localization.latitude = Number(crd.latitude.toFixed(2));
  my_localization.longitude = Number(crd.longitude.toFixed(2));
}

function error(err) {
  alert("ERROR(" + err.code + "): " + err.message);
  console.warn("ERROR(" + err.code + "): " + err.message);
}

var map = L.map("map", {
  center: [-34.60772172145942, -58.37041396110046],
  zoom: 13,
});

const markerGroup = L.layerGroup().addTo(map);

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

// al hacer click muestra una alerta con los datos del punto
function onMapClick(e) {
  alert("Click =>  " + e.latlng["lat"] + ", " + e.latlng["lng"]);
}

map.on("click", onMapClick);

// lectura de base de datos ( json) y creacion de marcadores
window.onload = function () {
  store.forEach(function (element) {
    var marker = L.marker([
      element.coordenadas.split(",")[0],
      element.coordenadas.split(",")[1],
    ]).addTo(markerGroup);
    const popup = `<b>Nombre:</b><span> ${element.nombre} <br/><b>Dirección:</b><span> ${element.direccion} <br/><b>Teléfono:</b><span> ${element.telefono} <br/><b>(X,Y):</b><span> ${element.coordenadas} <br/> <b>Categoría:</b><span> ${element.categoria} <br/> <p>(doble click para eliminar)</p>`;
    marker.on("dblclick", function () {
      markerGroup.removeLayer(marker);
    });

    marker.bindPopup(popup);
    marker.on("mouseover", function (e) {
      this.openPopup();
    });
    marker.on("mouseout", function (e) {
      this.closePopup();
    });
  });
};

// obtener mi ubicacion y marcar en el mapa al apretar el boton "Mi ubicacion"
let btn_mi_ubicacion = document.getElementById("btn_myLocation");
btn_mi_ubicacion.addEventListener("click", function () {
  let circle = L.circle([-34.50676, -58.762994], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(markerGroup);
  circle.bindPopup("Estoy por aqui.");
});

const btn_search = document.getElementById("btn_search");

// Logica del boton "Marcar"
btn_search.addEventListener("click", function () {
  const nombre = document.getElementsByClassName("form-control")[0].value;
  const direccion = document.getElementsByClassName("form-control")[1].value;
  const telefono = document.getElementsByClassName("form-control")[2].value;
  const categoria = document.getElementsByClassName("form-control-select")[0]
    .value;
  const coordenadas = document.getElementsByClassName("form-control")[3].value;

  //   Si ya existen esas connrdenadas, no se agrega
  store.forEach(function (element) {
    if (element.coordenadas == coordenadas) {
      return alert("Ubicacion ya marcada");
    }
  });

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

  let mark = L.marker(
    [Number(coordenadas.split(",")[0]), Number(coordenadas.split(",")[1])],
    {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }
  ).addTo(markerGroup);
  const popup = `<b>Nombre:</b><span> ${nombre} <br/><b>Dirección:</b><span> ${direccion} <br/><b>Teléfono:</b><span> ${telefono} <br/><b>(X,Y):</b><span> ${coordenadas} <br/> <b>Categoría:</b><span> ${categoria} <br/> <p>(doble click para eliminar)</p>`;
  //   doble click para eliminar marcador
  mark.on("dblclick", function () {
    markerGroup.removeLayer(mark);
  });

  mark.bindPopup(popup);

  //   muestra datos al posar el mouse encima
  mark.on("mouseover", function (e) {
    this.openPopup();
  });
  mark.on("mouseout", function (e) {
    this.closePopup();
  });

  store.push(lugar);
  console.table(store);
});
