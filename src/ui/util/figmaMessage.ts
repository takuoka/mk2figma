

export function figmaMessage(text) {
    parent.postMessage(
        {
            pluginMessage: {
                type: 'figmaMessage',
                text: text,
            }
        },
        '*'
    );
    console.log(text)
}

