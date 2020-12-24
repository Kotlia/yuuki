import DiscordJS from 'discord.js'
import DiscordIO from 'discord.io'
import Yuuki from "./yuuki.js";

export default class Client {

    static JS = new DiscordJS.Client()

    static IO = new DiscordIO.Client({
        token: Yuuki.config.bot_token,
        autorun: true
    })

    static init() {
        Client.JS.login(Yuuki.config.bot_token)
    }

}

