
var isEnableFigmaNotify = true;

window.onmessage = event => {
    switch (event.data.pluginMessage.type) {
        case 'fetchProjectsJSON':
            figmaNotifyIfEnable("start to fetch...📶🐣");
            figmaNotifyIfEnable("please implement fetch!!");
            // const limit = event.data.pluginMessage.limit;
            // fetchPJData(limit);
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

