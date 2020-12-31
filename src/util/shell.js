import cp from 'child_process'

export default class Shell {
    static e = cp.exec

    static async exec(cmd) {
        Shell.e(cmd, (err, stdout, stderr) => {
            return new Promise((res, rej) => {
                res(stdout)
            })
        })
    }
}