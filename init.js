navigator.geolocation.getCurrentPosition(success, error);

const my_localization = {
  latitude: "",
  longitude: "",
};

function success(pos) {
  var crd = pos.coords;
  my_localization.latitude = Number(crd.latitude.toFixed(2));
  my_localization.longitude = Number(crd.longitude.toFixed(2));
  console.log(my_localization);
}

function error(err) {
  alert("ERROR(" + err.code + "): " + err.message);
  console.warn("ERROR(" + err.code + "): " + err.message);
}

export { my_localization };
