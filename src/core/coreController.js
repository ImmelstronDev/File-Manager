export class CoreController {
    constructor() {
        this.userName = 'Empty'
        this.separator = '--username='
        this._welcomeMessage = `Welcome to the File Manager, ${this.userName}!`
        this.start()
    }

    start() {
        try {
            this.checkUserName()
            this.welcome()
        } catch (error) {
            console.log(`OOPS:${error}`)
        }
    }

    set welcomeMessage(userName) {
        this._welcomeMessage = `Welcome to the File Manager, ${userName}!`
    }

    get welcomeMessage() {
        return this._welcomeMessage
    }

    checkUserName() {
        const commandsArgs = process.argv.slice(2)
        const userNameFromArgs = commandsArgs.find((item) => item.startsWith(this.separator))
        const userName = userNameFromArgs.slice(this.separator.length)
        if(userName) {
            this.userName = userName
            this.welcomeMessage = userName
        }
        console.log('username:', userName, 'this.username:', this.userName)

    }

    welcome() {
        process.stdout.write(this._welcomeMessage)
    }

}