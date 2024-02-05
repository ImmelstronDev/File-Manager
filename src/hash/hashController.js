import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { EOL } from 'node:os'
import { resolve } from 'node:path'
export class HashController {
    constructor() {
        this.operationFail = 'Operation failed '
    }

    async handle(command){
        try {
            const argsArray = command.split(' ')
        argsArray.shift()
        if(!argsArray.length || argsArray.length !== 1) {
            process.stdout.write(this.operationFail + 'incorrect enter argument, enter <path to file> after command <hash> via space' + EOL)
            return
        }
        const path = resolve(process.cwd(), argsArray[0])
        const fileContent = await readFile(path, { encoding: 'utf8' })
        const hashing = createHash('sha256')
        hashing.update(fileContent)
        console.log(hashing.digest('hex'))
        } catch (error) {
            process.stdout.write(`Unknown operation, please enter correct command` + EOL);
            
        }
        
    }
}