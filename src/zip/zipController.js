import { createReadStream, createWriteStream } from 'node:fs'
import { EOL } from 'node:os'
import { basename, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'

export class ZipController {
    constructor() {
        this.operationFail = 'Operation failed '
    }

    async handle(command) {
        const argsArray = command.split(' ')
        const firstArg = argsArray.shift()
        const pathToFile = resolve(process.cwd(), argsArray[0])
        const nameFile = basename(pathToFile)
        const rs = createReadStream(pathToFile)
        
        if(!argsArray.length || argsArray.length !== 2) {
            process.stdout.write(this.operationFail + 'incorrect enter arguments, enter <path to file> and <path to destination> after command via space' + EOL)
            return
        }

        switch (firstArg) {
            case 'compress':{
                const newFileName = nameFile + '.br'
                const pathToNewDir = resolve(argsArray[1], newFileName)
                const ws = createWriteStream(pathToNewDir, {flags: 'wx'})
                const brotli = createBrotliCompress()
                pipeline(rs, brotli, ws)
                break;
            }
            case 'decompress':{
                const newFileName = nameFile.slice(0, -3)
                const pathToNewDir = resolve(argsArray[1],newFileName)
                const ws = createWriteStream(pathToNewDir, {flags: 'wx'})
                const unbrotli = createBrotliDecompress()
                pipeline(rs, unbrotli, ws)
                break;
            }
            default:
                process.stdout.write(`Unknown operation, please enter correct command` + EOL);
                break;
        }
    }
}