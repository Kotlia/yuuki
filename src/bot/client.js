import DiscordJS from 'discord.js'
import DiscordIO from 'discord.io'
import { Config } from "./config.js";

export default class Client {

    static JS = new DiscordJS.Client()

    static IO

    static init() {
        Client.IO = new DiscordIO.Client({
            token: Config.bot_token,
            autorun: true
        })
        Client.JS.login(Config.bot_token)
    }

}

