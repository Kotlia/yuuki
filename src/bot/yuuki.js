import Client from "./client.js";
import { commandProcessor } from "./message/commandProcesser.js";
import { Config } from "./config.js";
import VoiceManager from "./voice/voiceManager.js";
import { transliterate } from "./message/transliterate.js";
import wd from 'webhook-discord'
import isImage from 'is-image-url'
import { readFileSync, createWriteStream, unlink } from 'fs'
import fetch from 'node-fetch'
import imgurUploader from 'imgur-uploader'

export default class Yuuki {

    static init() {
        Client.JS.on('message', async msg => {

            if (msg.attachments.size && !msg.author.bot) {
                msg.attachments.forEach(it => {
                    if (isImage(it.attachment)) {
                        fetch(it.attachment).then(res => {
                            const log = new wd.Webhook(Config.log_webhook_url)
                            const path = `src/assets/imglog/${msg.author.id}_${msg.id}.png`
                            const ws = createWriteStream(path)
                            res.body.pipe(ws)
                            ws.on('finish', () => {
                                imgurUploader(readFileSync(path), {title: path}).then(data => {
                                    log.send(
                                        new wd.MessageBuilder()
                                            .setName(`${msg.author.username} @ ${msg.channel.name}`)
                                            .setAvatar(msg.author.avatarURL())
                                            .setText(data.link)
                                    ).then(() => {
                                        unlink(path, () => {})
                                    })
                                })
                            })
                        })
                    }
                })
            }

            if (msg.content.startsWith('/')) {
                commandProcessor(msg)
            } else if (Config.textChannels.includes(msg.channel.id)) {
                VoiceManager.append(msg)
            } else if (msg.channel.id === Config.jpch) {
                msg.delete()
                transliterate(msg).then(res => {
                    const hook = new wd.Webhook(Config.webhook_url)
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
