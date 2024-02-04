import { EOL } from 'node:os'
export class NavigationController {
    constructor() {
        this.operationFail = 'Operation failed'
    }

    async handle(command) {
        const argsArray = command.split(' ')
        const firstArg = argsArray[0]
        // console.log(currentCommand)
        switch (firstArg) {
            case 'up':{
                process.chdir('../')
                break;
            }
            default:{
                process.stdout.write(`Unknown operation, please enter another command` + EOL);
                break;
            }
        }
    }
}