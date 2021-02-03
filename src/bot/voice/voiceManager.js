import fs from 'fs'
import { Config } from "../config.js";
import { exec } from 'child_process';
import Client from "../client.js";

export default class VoiceManager {

    static queue = []

    static append(message) {
        if (message.length > 30 || new RegExp([":", "http", "@", "#"].join("|")).test(message)) return
        if (!fs.existsSync("src/assets/voice")) {
            fs.mkdirSync("src/assets/voice")
        }
        exec(`curl "https://api.voicetext.jp/v1/tts" -s -o "src/assets/voice/${message.channel.id}_${message.id}.mp3" -u "${Config.voicetext_token}:" -d "text=${encodeURIComponent(message.content)}" -d "speaker=show" -d "pitch=140" -d "speed=130"`)
        VoiceManager.queue.push(`${message.channel.id}_${message.id}`)
        if (VoiceManager.queue.length === 1) VoiceManager.speakout(`${message.channel.id}_${message.id}`)
    }

    static speakout(combinedId) {
        const [tcid, msgid] = combinedId.split('_')
        const vcid = Config.voiceChannels[Config.textChannels.indexOf(tcid)]
        Client.JS.channels.cache
            .get(vcid)
            .join()
            .then(con => {
                con.play(
                    `src/assets/voice/${VoiceManager.queue[0]}.mp3`
                )
                    .on('finish', () => {
                        fs.unlink(`src/assets/voice/${VoiceManager.queue[0]}.mp3`, () => {})
                        VoiceManager.queue.shift()
                        setTimeout(() => {
                            if (VoiceManager.queue.length > 0) VoiceManager.speakout(VoiceManager.queue[0])
                        }, 500)
                    })
            })
    }

}