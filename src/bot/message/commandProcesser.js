export const commandProcessor = message => {
    const raw = message.content
        .substring(1)
        .replace(/　/g, ' ')
        .split(' ')
    const label = raw.shift()

    switch (label) {
        default: break
    }
}