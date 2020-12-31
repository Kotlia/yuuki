import { roman } from "./locale/roman.js";
import fetch from 'node-fetch'

export const transliterate = async message => {
    let transliterated = ""
    try {
        await fetch(
            `http://www.google.com/transliterate?langpair=ja-Hira|ja&text=${
                encodeURIComponent(roman(message.content))
            }`
        )
            .then(res => res.json())
            .then(data => {
                data.forEach(it => transliterated += it[1][0])
            })
    } catch (e) {
    }
    return await new Promise((res, rej) => {
        res(transliterated)
    })
}