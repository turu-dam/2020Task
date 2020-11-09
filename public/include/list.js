let townInfo=[];

heightTop();
getListPrefecture();
searchBtnCheck();
cityListCheck();

let prefectureSelect = document.getElementById('geoapi-prefectures');
prefectureSelect.addEventListener('change', (event) => {
  deleteList('geoapi-cities');
  getListCity(event.target.value);
  searchBtnCheck();
  cityListCheck();
  deleteList('towns-list-ul');
});

let citySelect = document.getElementById('geoapi-cities');
citySelect.addEventListener('change', (event) => {
  searchBtnCheck();
  cityListCheck();
  deleteList('towns-list-ul');
});

function searchBtnCheck(){
  const prefectureSelect = document.getElementById('geoapi-prefectures');
  const citySelect = document.getElementById('geoapi-cities');
  let searchBtn = document.getElementById("search-btn");
  console.log(prefectureSelect);
  console.log(citySelect);
  if(prefectureSelect.value==="" || citySelect.value===""){
    console.log("disabled");
    searchBtn.disabled = true;
  }else{
    console.log("enabled");
    searchBtn.disabled = false;   
  }
}

function cityListCheck(){
  const prefectureSelect = document.getElementById('geoapi-prefectures');
  let cityList = document.getElementById("geoapi-cities");
  if(prefectureSelect.value===""){
    console.log("disabled");
    cityList.disabled = true;
  }else{
    console.log("enabled");
    cityList.disabled = false;   
  }
}

function deleteList(elm){
  console.log("deleteList");
  let elmSelect = document.getElementById(elm);
	while(elmSelect.lastChild)
	{
		elmSelect.removeChild(elmSelect.lastChild);
	}
}

async function getListPrefecture(){
  //startload();
  await fetch('//geoapi.heartrails.com/api/json?method=getPrefectures')
    .then(response => response.json())
    .then(data => {
      let prefectureSelect = document.getElementById('geoapi-prefectures');
      const prefectureList = data.response.prefecture;
      // selectタグの子要素にoptionタグを追加する
      prefectureList.forEach(data => {
          // optionタグを作成する
          const option = document.createElement("option");
          // optionタグのテキスト設定
          option.text = data;
          // optionタグのvalue設定
          option.value = data;
          // selectタグの子要素にoptionタグを追加する
          prefectureSelect.appendChild(option);       
      });
      //stopload();
    });
}

async function getListCity(prefecture){
    //startload();
    if(prefecture!==""){
      await fetch(`//geoapi.heartrails.com/api/json?method=getCities&prefecture=${prefecture}`)
        .then(response => response.json())
        .then(data => {
          let citySelect = document.getElementById('geoapi-cities');
          const cityList = data.response.location;
          const optionCity = document.createElement("option");
          // optionタグのテキスト設定
          optionCity.text = "市区町村名を選択してください";
          // optionタグのvalue設定
          optionCity.value = "";
          // selectタグの子要素にoptionタグを追加する
          citySelect.appendChild(optionCity);
          cityList.forEach(data => {
              // optionタグを作成する
              const option = document.createElement("option");
              // optionタグのテキスト設定
              option.text = data.city;
              // optionタグのvalue設定
              option.value = data.city;
              // selectタグの子要素にoptionタグを追加する
              citySelect.appendChild(option);       
          });
          //stopload();
        });
    }else{
      let citySelect = document.getElementById('geoapi-cities');
      const optionCity = document.createElement("option");
      // optionタグのテキスト設定
      optionCity.text = "市区町村名を選択してください";
      // optionタグのvalue設定
      optionCity.value = "";
      // selectタグの子要素にoptionタグを追加する
      citySelect.appendChild(optionCity);
      //stopload();
    }
}

async function getListTown(prefecture,city){
  startload();
  console.log("getTown");
  console.log(city);
  await fetch(`//geoapi.heartrails.com/api/json?method=getTowns&prefecture=${prefecture}&city=${city}`)
    .then(response => response.json())
    .then(data => {
      const townList = data.response.location;
      townInfo = townList;

      townList.forEach(data => {
        getNearStation(data.postal).then(response => response.json())
        .then(stationData => {
          if(data.town==='（その他）'){
            return;
          }
          
          let li = document.createElement('li');
          let a = document.createElement('a');
          let p1 = document.createElement('p');
          let p2 = document.createElement('p');

          if(stationData.response.station.length === 0){
            p1.textContent = data.town;
            p1.classList.add('list-title');
            p2.textContent = '最寄り駅情報無し';

            li.appendChild(p1);
          }else{
            const station = stationData.response.station[0];

            a.href = `javascript:detailPage('${data.town}')`;
            a.classList.add('link');
            a.classList.add('list-title');
            a.textContent = data.town;

            p2.textContent = `最寄り駅：${station.line} ${station.name}駅`;

            li.appendChild(a);
          }

          li.appendChild(p2);

          document.getElementById('towns-list-ul').appendChild(li);         
        });
      });
      stopload();
    });
}

async function getNearStation(postal){
  const stationInfo = await fetch(`//geoapi.heartrails.com/api/json?method=getStations&postal=${postal}`);
  return stationInfo;
}

function search(){
  //deleteList('towns-list-ul');
  const prefectureSelect = document.getElementById('geoapi-prefectures');
  const citySelect = document.getElementById('geoapi-cities');
  getListTown(prefectureSelect.value,citySelect.value);
}

function detailPage(town){
  console.log(townInfo);
  const result = townInfo.filter(function(item, index){
    if (item.town == town) return true;
  });
  console.log(result);
  window.location.href = `/detail.html?postal=${result[0].postal}`;
}
  
