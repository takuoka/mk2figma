class Requester {
    
    constructor() {
        // network.html
        figma.showUI(__html__, { visible: false })
    }

    async fetchProjectData(): Promise<ProjectData[]> {
        return new Promise((resolve, reject) => {
            this._fetchProjectsData(dataList => resolve(dataList) )
        })
    }

    private _fetchProjectsData(onSuccess) {
        figma.ui.onmessage = async msg => {
            switch (msg.type) {
                case 'onFetchProjectsData':
                    let jsonList: Object[] = msg.projects
                    let imageList: Uint8Array[] = msg.images
                
                    let dataList: ProjectData[] = []
                    for (var i = 0; i < jsonList.length; i++) {
                        dataList.push(new ProjectData(jsonList[i], imageList[i]))
                    }       
                    onSuccess(dataList)
                    break;
            }
        };
        figma.ui.postMessage({ type: 'fetchProjectsJSON' })
    }
}