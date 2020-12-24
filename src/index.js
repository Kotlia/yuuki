import "./bot/config.js"

[
    //Botのメインクラス
    "./bot/yuuki.js",
    //クライアント
    "./bot/client.js",

].map(async it => {
    (await import(it)).default.init()
})