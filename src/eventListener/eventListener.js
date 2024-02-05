import readline from 'node:readline'
import { EOL } from 'node:os'
import { NavigationController } from '../navigation/navigationController.js'
import { BasicOperationsController } from '../basicOperations/basicOperationsController.js'
import { OperationSystemController } from '../operationSystem/operationSystemController.js'

export class EventListener {
    constructor(userName) {
        this.userName = userName
        this.goodbyMessage = `Thank you for using File Manager, ${this.userName}, goodbye!` + EOL
        this.navigation = new NavigationController()
        this.basicOperation = new BasicOperationsController()
        this.operationSystem = new OperationSystemController()
        this.start()
    }
    start() {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        this.rl.on('line', async (input)=> {
            try {
                const commandArgs = input.split(' ')
                if(input.toString().trim() === '.exit') {
                    process.stdout.write(this.goodbyMessage)
                    process.exit(0)
                }
                if(commandArgs[0] === 'up' || commandArgs[0] === 'cd' || commandArgs[0] === 'ls'){
                    await this.navigation.handle(input)
                }
                if(commandArgs[0] === 'cat' 
                    || commandArgs[0] === 'add'
                    || commandArgs[0] === 'rn'
                    || commandArgs[0] === 'cp'
                    || commandArgs[0] === 'mv'
                    || commandArgs[0] === 'rm'){
                        await this.basicOperation.handle(input)
                }
                if(commandArgs[0] === 'os'){
                    await this.operationSystem.handle(input)
                }
                this.viewCurrentWorkDir()
            } catch (error) {
                console.log(error)
            }
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