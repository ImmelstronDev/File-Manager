import readline from 'node:readline'
import { EOL } from 'node:os'
import { NavigationController } from '../navigation/navigationController.js'

export class EventListener {
    constructor(userName) {
        this.userName = userName
        this.goodbyMessage = `Thank you for using File Manager, ${this.userName}, goodbye!` + EOL
        this.navigation = new NavigationController()
        this.start()
    }
    start() {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        this.rl.on('line', async (input)=> {
            try {
                await this.navigation.handle(input)
                this.viewCurrentWorkDir()
            } catch (error) {
                console.log(error)
            }
            
            // if(input.toString().trim() === '.exit') {
            //     process.stdout.write(this.goodbyMessage)
            //     process.exit(0)
            // }
            
            
        })
        process.on('exit', ()=> {
            this.rl.close();
            process.stdout.write(this.goodbyMessage)
        })
        this.rl.on('SIGINT', ()=> {
        this.rl.close();
       })
        this.rl.on('close', ()=> {
        process.exit(0)
       })
    }
   
    viewCurrentWorkDir() {
        process.stdout.write(`You are currently in ${process.cwd()}` + EOL)
    }
}