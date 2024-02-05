import { readdir } from 'node:fs/promises'
import { EOL } from 'node:os'
import { resolve } from 'node:path'
export class NavigationController {
    constructor() {
        this.operationFail = 'Operation failed '
    }

    async handle(command) {
        const argsArray = command.split(' ')
        const firstArg = argsArray.shift()
        switch (firstArg) {
            case 'up':{
                if (argsArray.length > 0) {
                    process.stdout.write(this.operationFail + 'incorrect enter, enter only <up> command' + EOL)
                    break
                }
                process.chdir('../')
                break;
            }
            case 'cd': {
                const strWithPath = argsArray.join(' ')
                const path = resolve(process.cwd(), strWithPath)
                try {
                    process.chdir(path)
                } catch (error) {
                    process.stdout.write(this.operationFail + 'incorrect path, enter correct path' + EOL)
                }
                break
            }
            case 'ls': {
                if (argsArray.length > 0) {
                    process.stdout.write(this.operationFail + 'incorrect enter, enter only <ls> command' + EOL)
                    break
                }
                await this.viewListOfAllIn()
                break
            }
            default:{
                process.stdout.write(`Unknown operation, please enter correct command` + EOL);
                break;
            }
        }
    }

    async viewListOfAllIn() {
        const currentDir = resolve(process.cwd())
        const itemsList = await readdir(currentDir, {withFileTypes: true})
        const viewList = itemsList.reduce((acc, cue)=> {
            const typeInfo = cue.isFile() ? 'file' : 'directory'
            const obj = {name: cue.name, type: typeInfo}
            return [...acc, obj]
        }, [])
        console.table(viewList)
    }
}