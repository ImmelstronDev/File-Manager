import { createReadStream, createWriteStream } from 'node:fs'
import { access, constants, open, rename, rm, writeFile } from 'node:fs/promises'
import { EOL } from 'node:os'
import { basename, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
export class BasicOperationsController {
    constructor() {
        this.operationFail = 'Operation failed '
    }

    async handle(command) {
        const argsArray = command.split(' ')
        const firstArg = argsArray.shift()

        switch (firstArg) {
            case 'cat':{
                const strWithPath = argsArray.join(' ')
                const path = resolve(process.cwd(), strWithPath)
                const fd = await open(path)
                const rs = fd.createReadStream({encoding: 'utf-8'})
                rs.pipe(process.stdout)
                break;
        }
            case 'add':{
                if(!argsArray.length || argsArray.length > 1) {
                    process.stdout.write(this.operationFail + 'incorrect enter count of arguments, enter <filename> after command <add> via space' + EOL)
                    break
                }
                const path = resolve(process.cwd(), argsArray[0])
                await writeFile(path, '', {flag: 'wx'})
                break;
        }
            case 'rn':{
                const pathToFile  = argsArray[0]
                const newFileName = argsArray[1]
                const incomePath = resolve(process.cwd(), pathToFile)
                if( !argsArray.length || argsArray.length !== 2) {
                    process.stdout.write(this.operationFail + 'incorrect enter count of arguments, enter <path to file> and <new filename> after command <rn> via space' + EOL)
                    break
                }
                await rename(incomePath, newFileName)
                break;
        }
            case 'cp':{
                const deleteFile = false
                await this.createRWS(argsArray, deleteFile)
                break;
        }
            case 'mv':{
                const deleteFile = true
                await this.createRWS(argsArray, deleteFile)
                break;
        }
            case 'rm':{
                if(!argsArray.length || argsArray.length !== 1) {
                    process.stdout.write(this.operationFail + 'incorrect enter count of arguments, enter <path to file> after command <rm> via space' +EOL)
                    break
                }
                const path = (process.cwd(), argsArray[0])
                await rm(path)
                break;
        }
            default: 
                process.stdout.write(`Unknown operation, please enter correct command` + EOL);
                break;
        }
    }

    async createRWS (args, deleteFile) {
        const pathToFile = args[0]
        const newFileDir = args[1]

        if (!args.length || args.length !== 2) {
            process.stdout.write(this.operationFail + 'incorrect commands enter, please enter <path to file> and <path to new directory> after command' + EOL);
            return;
        }
        
        const incomePath = resolve(process.cwd(), pathToFile)
        const fileName = basename(incomePath)
        const pathToNewDir = resolve(process.cwd, newFileDir, fileName)
        const rs = createReadStream(incomePath, {encoding: 'utf-8'})
        const ws = createWriteStream(pathToNewDir, {flags: 'wx'})
        await pipeline(rs, ws)

        if(deleteFile) {
            rm(incomePath)
        }
    }
}