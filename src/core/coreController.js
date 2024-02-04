import { EventListener } from "../eventListener/eventListener.js"
import { EOL } from 'node:os'

export class CoreController {
    constructor() {
        this.userName = 'Empty'
        this.separator = '--username='
        this._welcomeMessage = `Welcome to the File Manager, ${this.userName}!` + EOL
        this.start()
    }

    start() {
        try {
            this.checkUserName()
            this.welcome()
            this.eventListener = new EventListener(this.userName)
            this.eventListener.viewCurrentWorkDir()
        } catch (error) {
            console.log(`OOPS:${error}`)
        }
    }

    set welcomeMessage(userName) {
        this._welcomeMessage = `Welcome to the File Manager, ${userName}!` + EOL
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

    }

    welcome() {
        process.stdout.write(this._welcomeMessage)
    }

}