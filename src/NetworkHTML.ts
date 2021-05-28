class NetworkHTML {
    
    onSuccessToFetchProjectData: (dataList: ProjectData[])=>void

    constructor() {
        figma.showUI(__html__, { visible: false })// network.html

        figma.ui.onmessage = async msg => {
            switch (msg.type) {

                case 'onFetchProjectsData':
                    let jsonList: Object[] = msg.projects
                    let imageList: Uint8Array[] = msg.images
                
                    let dataList: ProjectData[] = []
                    for (var i = 0; i < jsonList.length; i++) {
                        dataList.push(new ProjectData(jsonList[i], imageList[i]))
                    }       
                    this.onSuccessToFetchProjectData(dataList)
                    break;

                case 'figmaNotify':
                    figma.notify(msg.text, {timeout: 800})
            }
        };
    }

    async fetchProjectData(limit: number): Promise<ProjectData[]> {
        return new Promise((resolve, reject) => {
            this.onSuccessToFetchProjectData = (dataList => resolve(dataList))
            figma.ui.postMessage({ type: 'fetchProjectsJSON', limit: limit})
        })
    }
}