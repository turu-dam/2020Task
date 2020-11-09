heightDetail();

let query = location.search;
const value = query.split('=');
const postal = decodeURIComponent(value[1]);

console.log(decodeURIComponent(value[1]));

fetch(`//geoapi.heartrails.com/api/json?method=getStations&postal=${postal}`)
.then(response => response.json())
  .then(data => {
    const stationInfo = data.response.station[0];
    console.log(stationInfo);        
    const x = stationInfo.x;
    const y = stationInfo.y;
    const stationName = stationInfo.name;
    const stationLine = stationInfo.line;
    console.log(x);
    console.log(y);

    //var map = L.map('map-id').setView([35.688544, 139.764692], 18);
    const xy = [y,x];
    console.log(xy);
    let map = L.map('map-id').setView(xy, 18);

    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    });

    osm.addTo(map);

    //JIG-SAW本社の位置にマーカーを追加する。
    //var marker = L.marker([35.688544,139.764692]).addTo(map);
    let marker = L.marker(xy).addTo(map);
    //上のマーカーにポップアップを追加する。
    marker.bindPopup(`${stationLine}${stationName}駅`).openPopup();
})

