import Client from "./client.js";
import { commandProcessor } from "./message/commandProcesser.js";
import { Config } from "./config.js";
import VoiceManager from "./voice/voiceManager.js";
import { transliterate } from "./message/transliterate.js";
import wd from 'webhook-discord'

export default class Yuuki {

    static init() {
        Client.JS.on('message', async msg => {
            if (msg.content.startsWith('/')) {
                commandProcessor(msg)()
            } else if (Config.textChannels.includes(msg.channel.id)) {
                VoiceManager.append(msg)
            } else if (msg.channel.id === Config.jpch) {
                msg.delete()
                const hook = new wd.Webhook(Config.webhook_url)
                transliterate(msg).then(async res => {
                    hook.send(
                        new wd.MessageBuilder()
                            .setName(msg.author.username,)
                            .setAvatar(`https://minotar.net/helm/${msg.author.username}`)
                            .setText(`${res}  \`${msg.content}\``)
                    )
                })
            }
        })
    }
}