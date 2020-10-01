var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var proms = figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" });
proms.then(() => main());
function main() {
    figma.showUI(__html__, { visible: false });
    figma.ui.postMessage({ type: 'fetchProjectsJSON' });
    // figma.closePlugin()
}
function onFetchPrjectObj(msg) {
    console.log("---onFetchPrjectObj---");
    console.log(msg);
    let projectJsonList = msg.projects;
    let imageList = msg.images;
    let projects = [];
    for (var i = 0; i < projectJsonList.length; i++) {
        projects.push(new ProjectData(projectJsonList[i], imageList[i]));
    }
    console.log(projects);
    getPjComponents().forEach((pjComp, i) => {
        fillPjComponent(pjComp, projects[i]); //👋 TODO:ループ
    });
}
function fillPjComponent(pjFrame, pjData) {
    console.log("---fillPjComponent----");
    console.log(pjData);
    const imageNode = pjFrame.findOne(n => n.name == "@thumbnail");
    setImage(imageNode, pjData.image);
    const titleNode = pjFrame.findOne(n => n.name == "@title");
    titleNode.characters = pjData.json["title"];
}
// ---------------------------------------------------------------------------------------------
// Bind
// ---------------------------------------------------------------------------------------------
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    switch (msg.type) {
        case 'onFetchProjectsData':
            onFetchPrjectObj(msg);
            break;
        case 'onFetchImage':
            onFetchImage(msg.image);
            break;
    }
});
// ---------------------------------------------------------------------------------------------
// Util
// ---------------------------------------------------------------------------------------------
class ProjectData {
    constructor(pj, image) {
        this.json = pj;
        this.image = image;
    }
}
function getPjComponents() {
    var pjFrameList = [];
    for (const node of figma.currentPage.children) {
        if (node.name == "@Project") {
            pjFrameList.push(node);
        }
    }
    return pjFrameList;
}
function getPjComponentsFromSelection() {
    var pjFrameList = [];
    for (const node of figma.currentPage.selection) {
        if (node.name == "@Project") {
            pjFrameList.push(node);
        }
    }
    return pjFrameList;
}
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
// ---------------------------------------------------------------------------------------------
// Experiment
// ---------------------------------------------------------------------------------------------
// figma.ui.postMessage({ type: 'fetchImage' })
function onFetchImage(image) {
    let img = image;
    let rect = exam_get_first_thumb_node();
    setImage(rect, img);
}
function exam_get_first_thumb_node() {
    for (const node of figma.currentPage.children) {
        if (node.name == "@Project") {
            const pjFrame = node;
            const imageNode = pjFrame.findOne(n => n.name == "@thumbnail");
            return imageNode; //とれてる
        }
    }
}
