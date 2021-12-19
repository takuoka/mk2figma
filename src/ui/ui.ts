import { MetabaseAPI } from "./fetchData/MetabaseAPI";

var isEnableFigmaNotify = true;

window.onmessage = event => {
    switch (event.data.pluginMessage.type) {
        case 'fetchProjectsJSON':
            figmaNotifyIfEnable("start to fetch...📶🐣");
            figmaNotifyIfEnable("please implement fetch!!");
            // const limit = event.data.pluginMessage.limit;
            // fetchPJData(limit);

            let metabase = new MetabaseAPI()
            metabase.doooit()

            break;
        default:
            figmaNotifyIfEnable("hmm");
    }
};

function figmaNotifyIfEnable(text) {
    if (isEnableFigmaNotify) {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'figmaNotify',
                    text: text,
                }
            },
            '*'
        );
    }
    console.log(text)
}

