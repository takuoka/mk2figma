var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FigmaUtil = {
    setImage: function (target, imgData) {
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
};
class ProjectComponent {
    constructor(projectFrame) {
        this.frame = projectFrame;
        this.thubnail = projectFrame.findOne(n => n.name == "@thumbnail");
        this.title = projectFrame.findOne(n => n.name == "@title");
        this.money = projectFrame.findOne(n => n.name == "@money");
        this.time = projectFrame.findOne(n => n.name == "@time");
        this.progressText = projectFrame.findOne(n => n.name == "@progress_num");
        this.progressArea = projectFrame.findOne(n => n.name == "@progress_area");
        this.progressBar = projectFrame.findOne(n => n.name == "@progress_bar");
    }
    setData(data) {
        FigmaUtil.setImage(this.thubnail, data.image);
        this.title.characters = data.title;
        this.money.characters = Util.formatAsJPY(data.collectedMoney) + "円";
        this.time.characters = data.timeleftText;
        this.progressText.characters = data.percent.toString();
    }
}
class ProjectData {
    constructor(json, image) {
        this.title = json["title"];
        this.collectedMoney = json["collected_money"];
        this.timeleftText = json["time_left_label"];
        this.percent = json["percent"];
        this.image = image;
    }
}
const Util = {
    formatAsJPY: function (money) {
        var str = money.toString();
        while (str != (str = str.replace(/^(-?\d+)(\d{3})/, "$1,$2")))
            ;
        return str;
    }
};
Promise.all([
    figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
    figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" })
])
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
