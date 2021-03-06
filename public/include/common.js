/* スマホ用高さ */
if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
  var vh=window.innerHeight;
  console.log(vh);
  document.body.style.height=vh+'px';
  document.getElementById('loader-bg').style.height=vh+'px';
  // document.getElementsByClassName('wrapper')[0].style.height=(vh-120)+'px';
  // document.getElementsByClassName('map')[0].style.height=(vh-200)+'px';
  // document.getElementsByClassName('list-area')[0].style.height=(vh-340)+'px';
}

function heightTop(){
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    var vh=window.innerHeight;
    console.log(vh);
    document.getElementsByClassName('container')[0].style.minHeight=vh+'px';
    document.getElementsByClassName('wrapper')[0].style.height=(vh-120)+'px';
    document.getElementsByClassName('list-area')[0].style.height=(vh-340)+'px';
  } 
}

function heightDetail(){
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    var vh=window.innerHeight;
    console.log(vh);
    document.getElementsByClassName('map')[0].style.height=(vh-200)+'px';
  } 
}

/* ロード画面を表示にする処理 */
function startload(){
  console.log("startload");
  var bg = document.getElementById('loader-bg'),
  loader = document.getElementById('loader');

  bg.classList.add('show');
  loader.classList.add('show');  
}

/* ロード画面を非表示にする処理 */
function stopload(){
  console.log("stopload");
  var bg = document.getElementById('loader-bg'),
  loader = document.getElementById('loader');

  bg.classList.remove('show');
  loader.classList.remove('show');  
}