import { MetabaseAPI } from "./fetchData/MetabaseAPI";
import { Fetcher } from "./Fetcher";
import { figmaMessage } from "./util/figmaMessage";

window.onmessage = event => {
    switch (event.data.pluginMessage.type) {

        case 'fetchBoomProjectsJSON':
            Fetcher.fetchBoomProjects().then(projects => {
                parent.postMessage({pluginMessage: { type: 'onFetchBoomProjectsData', projects: projects } },'*')
            })
            break

        default:
            break
    }
};

