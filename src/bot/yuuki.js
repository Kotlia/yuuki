import Client from "./client.js";
import { commandProcessor } from "./message/commandProcesser.js";
import { Config } from "./config.js";
import Voice  from "./message/voice.js";
import { transliterate } from "./message/transliterate.js";

export default class Yuuki {

    static init() {
        Client.JS.on('message', async msg => {
            if (msg.content.startsWith('/')) {
                commandProcessor(msg)()
            } else if (Config.voiceChannels.includes(msg.channel.id)) {
                new Voice(msg).speak(Config.textChannels[Config.voiceChannels.indexOf(msg.channel.id)])
            } else if (msg.channel.id === Config.jpch) {
                msg.delete()
                Client.IO.sendMessage({
                    to: msg.channel.id,
                    message: transliterate(msg)
                })
            }
        })
    }

}