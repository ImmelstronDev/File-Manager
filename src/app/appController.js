import { CoreController } from "../core/coreController.js"

export class AppController{
    constructor() {
        this.coreApplication = new CoreController()
    }
}