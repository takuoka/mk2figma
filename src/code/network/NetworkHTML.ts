import { BoomProjectData } from "../model/BoomProjectData";

export class NetworkHTML {
    
    onFetchBoomProjectsData: (message: any)=>void

    constructor() {
        figma.showUI(__html__, { visible: false })// ui.html
        this.startListen()
    }

    async fetchBoomProjects(): Promise<BoomProjectData[]> {
        return new Promise((resolve, reject) => {
            this.onFetchBoomProjectsData = (message => {
                resolve(message.projects)
            })
            figma.ui.postMessage({ type: 'fetchBoomProjectsJSON'})
        })
    }

    private startListen() {
        figma.ui.onmessage = async msg => {
            switch (msg.type) {
                case 'onFetchBoomProjectsData':
                    this.onFetchBoomProjectsData(msg)
                    break
                case 'figmaNotify':
                    figma.notify(msg.text, {timeout: 1000})
                    break
            }
        };
    }
}