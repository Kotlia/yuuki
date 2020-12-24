import yaml from 'js-yaml'
import fs from 'fs'
import Client from "./client.js";

export default class Yuuki {

    static config = yaml.safeLoad(fs.readFileSync('src/assets/bot.yml'))

    static init() {
        Client.JS.on('message', async message => )
    }

}