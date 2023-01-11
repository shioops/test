

//関数一覧
//震度情報取得
function maxScaleConv(maxScale) {
    var intensity = '';
    switch (maxScale) {
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
    var name = '';
    if (area != '') {
        name = area;
    } else {
        name = '震源地情報なし';
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
function textWrite(rjson) {
    for (let i = 0; i <= 4; i++) {
        //地震発生時刻を表示
        var time = document.getElementById("time" + i);
        time.innerHTML = "発生時刻:" + rjson[i].time;
        //震源地を表示
        var area = document.getElementById("area" + i);
        area.innerHTML = "震源:" + areaConv(rjson[i].earthquake.hypocenter.name);
        //最大深度を表示
        var magnitude = document.getElementById("magnitude" + i);
        magnitude.innerHTML = "最大震度:" + maxScaleConv(rjson[i].earthquake.maxScale);
        //最大震度3以上の情報を強調表示
        var flame = document.getElementById("earthQuake" + i);
        var border = document.getElementById("No" + i);
        if (rjson[i].earthquake.maxScale > 20) {
            flame.style.borderColor = '#FF0000'
            magnitude.style.color = '#FF0000'
            magnitude.style.fontWeight = 'bold'
            border.style.borderColor = '#FF0000'
            border.style.color = '#FF0000'
            border.style.backgroundColor= '#FFB3B3'
            
        }

    }
}

//ここからメイン処理
//APIから地震情報JSONデータ取得
var log = apiRequest();
//JSONをJavaScriptのオブジェクトに変換
var rjson = JSON.parse(log);
//直近5件の地震情報を表示
textWrite(rjson);

//60秒ごとに実行
//APIからデータを再取得し、データの変更がある場合は画面を更新
window.setInterval(function () {
    try {
        var apiHttp = apiRequest();
    } catch (e) {
        //エラーの場合はメッセージを表示してページをリロード
        alert('エラーが発生しました。ページをリロードします。');
        window.location.reload();
    };
    var rjson = JSON.parse(apiHttp);
    //APIからの地震データが更新されている場合
    if (apiHttp != log) {
        //最新JSONデータの更新
        log = apiHttp;
        //直近5件の地震情報を表示
        textWrite(rjson);
        //地震情報更新通知
        alert('地震情報が更新されました。');
    };
}, 60000);