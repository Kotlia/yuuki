# yuuki

おやさいの読上げBot - 読上ゆうき君

![Yuuki](https://cdn.discordapp.com/attachments/718050872663212086/798517864570290197/2020-07-02_213857.png)

↑これは東口ゆうき

## 開発者情報

### Init

デフォルトエクスポートでinit()メソッドを定義して下さい。
### src/index.js
```javascript
import "./bot/config.js"
[
    "./bot/yuuki.js",
    "./bot/client.js",
    //ここに追加
].map(async it => {
    (await import(it)).default.init()
})
```
