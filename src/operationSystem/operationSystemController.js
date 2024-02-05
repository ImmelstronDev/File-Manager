import { EOL, arch, cpus, homedir, userInfo } from 'node:os'

export class OperationSystemController {
    constructor() {
        this.operationFail = 'Operation failed '
    }
    
    async handle(command) {
        const argsArray = command.split(' ')
        argsArray.shift()
        const arg = argsArray[0].trim().slice(2).toLowerCase()

        if(!argsArray.length || argsArray.length !== 1) {
            process.stdout.write(this.operationFail + 'incorrect enter count of arguments, enter <--argument> after command <os> via space' + EOL)
        }

        switch (arg) {
            case 'eol':{
                process.stdout.write(JSON.stringify(EOL) + EOL)
                break;
            }
            case 'cpus':{
                const result = cpus().reduce((arr, cur) => {
                    return [...arr, {model: cur.model, 'clock Rate': `${cur.speed/1000} Ghz`}]
                }, [])
                console.table({'Amount of CPUS': result.length})
                console.table(result)
                break;
            }
            case 'homedir':{
                console.log(`Home directory: ${homedir()}`)
                break;
            }
            case 'username':{
                console.log(`User: ${userInfo().username}`)
                break;
            }
            case 'architecture':{
                console.log(`Architecture: ${arch()}`)
                break;
            }

            default:
                process.stdout.write(`Unknown operation, please enter correct command` + EOL);
                break;
        }
    }
}