import { readdir } from 'node:fs/promises'
import { EOL } from 'node:os'
import { resolve } from 'node:path'
export class NavigationController {
    constructor() {
        this.operationFail = 'Operation failed'
    }

    async handle(command) {
        const argsArray = command.split(' ')
        const firstArg = argsArray.shift()
        switch (firstArg) {
            case 'up':{
                process.chdir('../')
                break;
            }
            case 'cd': {
                const strWithPath = argsArray.join(' ')
                const path = resolve(process.cwd(), strWithPath)
                // console.log(path)
                try {
                    process.chdir(path)
                } catch (error) {
                    process.stdout.write(this.operationFail + 'incorrect path, enter correct path' + EOL)
                }
                break
            }
            case 'ls': {
                try {
                    await this.viewListOfAllIn()
                } catch (error) {
                    process.stdout.write(this.operationFail + 'incorrect enter, enter only <ls> command' + EOL)
                }
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
            const obj = {name: cue.name, type: cue.type}
            return [...acc, obj]
        }, [])

        console.table(viewList)
        
    }
}