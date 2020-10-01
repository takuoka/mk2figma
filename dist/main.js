var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ProjectComponent {
    constructor(projectFrame) {
        this.frame = projectFrame;
        this.imageNode = projectFrame.findOne(n => n.name == "@thumbnail");
        this.titleNode = projectFrame.findOne(n => n.name == "@title");
    }
    setData(data) {
        setImage(this.imageNode, data.image);
        this.titleNode.characters = data.json["title"];
    }
}
// Util
function setImage(target, imgData) {
    const imageHash = figma.createImage(imgData).hash;
    const currentFills = target['fills'];
    const newFill = {
        type: 'IMAGE',
        opacity: 1,
        blendMode: 'NORMAL',
        scaleMode: 'FILL',
        imageHash: imageHash,
    };
    target['fills'] = [newFill];
}
class ProjectData {
    constructor(pj, image) {
        this.json = pj;
        this.image = image;
    }
}
figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" })
    .then(() => main());
function main() {
    figma.showUI(__html__, { visible: false });
    figma.ui.postMessage({ type: 'fetchProjectsJSON' });
    // figma.closePlugin()
}
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    switch (msg.type) {
        case 'onFetchProjectsData':
            onFetchPrjectObj(msg);
            break;
    }
});
function onFetchPrjectObj(msg) {
    let jsonList = msg.projects;
    let imageList = msg.images;
    let dataList = [];
    for (var i = 0; i < jsonList.length; i++) {
        dataList.push(new ProjectData(jsonList[i], imageList[i]));
    }
    getPjComponentsFromPage().forEach((pjComp, i) => pjComp.setData(dataList[i]));
}
function getPjComponentsFromPage() {
    var pjCompList = [];
    //	for (const node of figma.currentPage.selection)
    for (const node of figma.currentPage.children) {
        if (node.name == "@Project") {
            const comp = new ProjectComponent(node);
            pjCompList.push(comp);
        }
    }
    return pjCompList;
}
