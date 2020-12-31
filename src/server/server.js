import cp from "child_process"
import readline from 'readline-promise'
import Shell from "../util/shell.js";

export default class Server {
    static async init() {
        await Shell.exec("echo $(pidof java)")
    }
}



const minecraftServerProcess = cp.spawn('cd src/', [
    '-Xmx512M',
    '-Xms256M',
    '-jar',
    'src/mc/paper.jar',
    'nogui'
]);

function log(data) {
    process.stdout.write(data.toString());
}
minecraftServerProcess.stdout.on('data', log);
minecraftServerProcess.stderr.on('data', log);

const rlp = readline.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

commandExecuter()

function commandExecuter() {
    rlp.questionAsync("").then(c => {
        minecraftServerProcess.stdin.write(c.toString() + '\n')
        commandExecuter()
    });
}