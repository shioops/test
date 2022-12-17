//関数一覧
//震度情報取得
function maxScaleConv(maxScale) {
    var intensity = '';
    switch (maxScale){
    case 10:
        intensity = '1';
    break;
    case 20:
        intensity = '2';
    break;
    case 30:
        intensity = '3';
    break;
    case 40:
        intensity = '4';
    break;
    case 45:
        intensity = '5弱';
    break;
    case 50:
        intensity = '5強';
    break;
    case 55:
        intensity = '6弱';
    break;
    case 60:
        intensity = '6強';
    break;
    default:
        intensity = '震度情報なし';
    }
    return intensity;
}
//震源地情報取得
function areaConv(area) {
    var name ='';
    if(area != ''){
        name = area;
    }else{
        name ='震源地情報なし';
    }
    return name;
}
//APIから地震情報JSONデータ取得
function apiRequest() {
    var apiHttps = new XMLHttpRequest();
    //P2P地震情報 APIへのリクエスト設定
    apiHttps.open("GET", "https://api.p2pquake.net/v2/history?codes=551", false);
    //リクエストを送信
    apiHttps.send();
    //最新JSONデータを格納
    return apiHttps.responseText;
}
//地震情報表示
function textWrite(rjson){
    for (let i = 0; i <= 4; i++) {
        var time = document.getElementById("time"+i);
        time.innerHTML ="発生時刻:"+rjson[i].time;
        var area = document.getElementById("area"+i);
        area.innerHTML ="震源:"+areaConv(rjson[i].earthquake.hypocenter.name);
        var magnitude = document.getElementById("magnitude"+i);
        magnitude.innerHTML ="最大震度:"+ maxScaleConv(rjson[i].earthquake.maxScale); 
    }
}

//ここからメイン処理
var log = apiRequest();
//JSONをJavaScriptのオブジェクトに変換
var rjson=JSON.parse(log);
//直近5件の地震情報を表示
textWrite(rjson)

Notification.requestPermission();
const notification = new Notification("Check!");

//60秒ごとに実行
setInterval(function(){
    try{
        var apiHttp = apiRequest();
    }catch(e){};
    var rjson=JSON.parse(apiHttp);
        //APIからの地震データが更新されている場合
        if(apiHttp != log){
        //最新JSONデータの更新
        log=apiHttp;
        //直近5件の地震情報を表示
        textWrite(rjson);
    }; 
},60000);


/* //ここからメイン処理
var apiHttps = new XMLHttpRequest();
//P2P地震情報 APIへのリクエスト設定
apiHttps.open("GET", "https://api.p2pquake.net/v2/history?codes=551", false);
//リクエストを送信
apiHttps.send();
//JSONをJavaScriptのオブジェクトに変換
var rjson=JSON.parse(apiHttps.responseText);
//最新JSONデータを格納
var log=apiHttps.responseText;
//直近5件の地震情報を表示
for (let i = 0; i < 6; i++) {
    var time = document.getElementById("time"+i);
    time.innerHTML ="発生時刻:"+rjson[i].time;
    var area = document.getElementById("area"+i);
    area.innerHTML ="震源:"+areaConv(rjson[i].earthquake.hypocenter.name);
    var magnitude = document.getElementById("magnitude"+i);
    magnitude.innerHTML ="最大震度:"+ maxScaleConv(rjson[i].earthquake.maxScale); 
}
//60秒ごとに実行
setInterval(function(){
    try{
        var apiHttp;
        apiHttp = new XMLHttpRequest();
        apiHttp.open("GET", "https://api.p2pquake.net/v2/history?codes=551", false);
        apiHttp.send(null);
        var jsonData=apiHttp.responseText;
    }catch(e){};
    var rjson=JSON.parse(apiHttp.responseText);
        //APIからの地震データが更新されている場合
        if(apiHttp.responseText != log){
        //最新JSONデータの更新
        log=apiHttp.responseText;
        //直近5件の地震情報を表示
        for (let i = 0; i < 6; i++) {
        var time = document.getElementById("time"+i);
        time.innerHTML ="発生時刻:"+rjson[i].time;
        var area = document.getElementById("area"+i);
        area.innerHTML ="震源:"+areaConv(rjson[i].earthquake.hypocenter.name);
        var magnitude = document.getElementById("magnitude"+i);
        magnitude.innerHTML ="最大震度:"+ maxScaleConv(rjson[i].earthquake.maxScale);  
}
    }; 
},60000);
*/
