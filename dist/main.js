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
        var imageHash = "";
        // avoid error of image type
        try {
            imageHash = figma.createImage(imgData).hash;
        }
        catch (error) {
            console.log(error);
        }
        if (imageHash.length == 0) {
            return;
        }
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
        this.updateProgressBar(data.percent);
    }
    updateProgressBar(percent) {
        const per = percent > 100 ? 100 : percent;
        const newWidth = this.progressArea.width * (per / 100);
        this.progressBar.resize(newWidth, this.progressBar.height);
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
class Requester {
    constructor() {
        // network.html
        figma.showUI(__html__, { visible: false });
    }
    fetchProjectData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._fetchProjectsData(dataList => resolve(dataList));
            });
        });
    }
    _fetchProjectsData(onSuccess) {
        figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            switch (msg.type) {
                case 'onFetchProjectsData':
                    let jsonList = msg.projects;
                    let imageList = msg.images;
                    let dataList = [];
                    for (var i = 0; i < jsonList.length; i++) {
                        dataList.push(new ProjectData(jsonList[i], imageList[i]));
                    }
                    onSuccess(dataList);
                    break;
            }
        });
        figma.ui.postMessage({ type: 'fetchProjectsJSON' });
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
    const requester = new Requester();
    requester.fetchProjectData()
        .then(dataList => {
        getPjComponentsFromPage().forEach((pjComp, i) => {
            let loopIndex = dataList.length - 1 < i ? (i % dataList.length) : i;
            pjComp.setData(dataList[loopIndex]);
        });
        figma.closePlugin();
    });
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
