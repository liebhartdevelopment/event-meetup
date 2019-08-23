import "./general";

export function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 40.469846, lng: -98.558481 }
  });

  const marker = new google.maps.Marker({
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 40.469846, lng: -98.558481 }
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });

  const infowindow = new google.maps.InfoWindow({
    content: `<h3>Event Location</h3><p>Event Address with all the contact details</p>`
  });

  infowindow.open(map, marker);
}

window.addEventListener("load", () => {
  // Create script tag on about page
  const $script = document.createElement("script");
  // Add Google Maps URL with api key and callback function
  $script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&callback=bundle.initMap`;
  // Append script tag to body element
  document.querySelector("body").appendChild($script);
});
