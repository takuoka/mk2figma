import { MetabaseAPI } from "./fetchData/MetabaseAPI";

var isEnableFigmaNotify = true;

window.onmessage = event => {
    switch (event.data.pluginMessage.type) {
        case 'fetchProjectsJSON':
            figmaNotifyIfEnable("start to fetch...📶🐣");
            figmaNotifyIfEnable("please implement fetch!!");
            // const limit = event.data.pluginMessage.limit;
            // fetchPJData(limit);

            MetabaseAPI.getSingleton()
            .then(metabaseAPI => {
                console.log("aa👋ae!! " + metabaseAPI.token)
                metabaseAPI.fetchBoomData().then(data =>
                    console.log(data)
                )
            })

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

