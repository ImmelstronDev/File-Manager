import readline from 'node:readline'
import { EOL } from 'node:os'

export class EventListener {
    constructor(userName) {
        this.userName = userName
        this.goodbyMessage = `Thank you for using File Manager, ${this.userName}, goodbye!` + EOL
        this.start()
    }
    start() {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        this.rl.on('line', (input)=> {
            this.viewCurrentWorkDir()
            if(input.toString().trim() === '.exit') {
                process.stdout.write(this.goodbyMessage)
                process.exit(0)
            }
            
        })
        // process.stdin.on('data', (chunk)=> {
        //     if (chunk.toString().trim() === '.exit') process.exit()
            
        // })
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