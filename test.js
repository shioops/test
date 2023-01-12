//メイン処理

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