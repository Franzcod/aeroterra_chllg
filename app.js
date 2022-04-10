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
