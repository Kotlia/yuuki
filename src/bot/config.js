import yaml from "js-yaml";
import fs from "fs";
import Yuuki from "./yuuki.js";
import _ from 'lodash'

/**
 * @type {{
 *  extension: string,
 *  tokumei_log: string,
 *  webhook_url: string,
 *  channels: {voice: string, text: string},
 *  jpch: string,
 *  bot_token: string,
 *  voicetext_token: string,
 *  server_reboot: number
 *  raw: any,
 *  textChannels: array,
 *  voiceChannels: array,
 * }}
 */

export const Config = yaml.safeLoad(fs.readFileSync('src/assets/bot.yml'))

Config.raw = _.zip(...Object.entries(_.zip(...Object.entries(Config.channels))[1]))[1]

Config.textChannels = []
Config.voiceChannels = []

Config.raw.forEach(it => {
    Config.textChannels.push(it.text)
    Config.voiceChannels.push(it.voice)
})
