import { EOL, arch, cpus, homedir, userInfo } from 'node:os'

export class OperationSystemController {
    constructor() {
        this.operationFail = 'Operation failed '
    }

    async handle(command) {
        const argsArray = command.split(' ')
        argsArray.shift()
        const arg = argsArray[0].trim().slice(2).toLowerCase()

        switch (arg) {
            case 'eol':{
                process.stdout.write(JSON.stringify(EOL) + EOL)
                break;
            }
            case 'cpus':{
                const result = cpus().reduce((arr, cur) => {
                    return [...arr, {model: cur.model, 'clock Rate': `${cur.speed/1000} Ghz`}]
                }, [])
                // process.stdout.write(`Amount of CPUS: ${result.length}, model: ${result.model}, clock rate: ${result.clockRate}` + EOL)
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
                break;
        }
    }
}