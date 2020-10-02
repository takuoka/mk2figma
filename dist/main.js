var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var imageCahce;
const FigmaUtil = {
    setImage: function (target, imageData, imageId) {
        if (imageCahce == undefined) {
            imageCahce = new ImageCache();
        }
        var imageHash = "";
        var isFailed = false;
        try {
            imageHash = figma.createImage(imageData).hash;
        }
        catch (error) {
            console.log(error);
            isFailed = true;
        }
        if (isFailed) {
            if (!imageCahce.isEmpty()) {
                imageHash = figma.createImage(imageCahce.getRandom()).hash;
            }
        }
        else {
            imageCahce.addImage(imageData, imageId);
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
class ImageCache {
    constructor() {
        this.images = [];
        this.idList = [];
    }
    isEmpty() {
        return this.images.length == 0;
    }
    addImage(img, id) {
        if (!this.isExist(id)) {
            this.images.push(img);
            this.idList.push(id);
            console.log("ImageChace lentgh: " + this.images.length);
        }
    }
    getRandom() {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
    isExist(id) {
        return this.idList.indexOf(id) >= 0;
    }
}
class NetworkHTML {
    constructor() {
        figma.showUI(__html__, { visible: false }); // network.html
        figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            switch (msg.type) {
                case 'onFetchProjectsData':
                    let jsonList = msg.projects;
                    let imageList = msg.images;
                    let dataList = [];
                    for (var i = 0; i < jsonList.length; i++) {
                        dataList.push(new ProjectData(jsonList[i], imageList[i]));
                    }
                    this.onSuccessToFetchProjectData(dataList);
                    break;
                case 'figmaNotify':
                    figma.notify(msg.text, { timeout: 800 });
            }
        });
    }
    fetchProjectData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.onSuccessToFetchProjectData = (dataList => resolve(dataList));
                figma.ui.postMessage({ type: 'fetchProjectsJSON' });
            });
        });
    }
}
class ProjectComponent {
    constructor(projectFrame) {
        this.frame = projectFrame;
        this.thubnail = projectFrame.findOne(n => n.name == "@thumbnail");
        this.title = projectFrame.findOne(n => n.name == "@title");
        this.money = projectFrame.findOne(n => n.name == "@money");
        this.time = projectFrame.findOne(n => n.name == "@time");
        this.progressText = projectFrame.findOne(n => n.name == "@progress_num");
        this.progressBarSpacer = projectFrame.findOne(n => n.name == "@progress_bar_spacer");
    }
    setData(data) {
        FigmaUtil.setImage(this.thubnail, data.image, data.id);
        this.title.characters = data.title;
        this.money.characters = Util.formatAsJPY(data.collectedMoney) + "円";
        this.time.characters = data.timeleftText;
        this.progressText.characters = data.percent.toString() + "%";
        this.updateSpecialProgressBar(data.percent, this.progressBarSpacer);
    }
    updateSpecialProgressBar(percent, spacer) {
        const MAX_NUM = 90;
        const per = percent > 100 ? 100 : percent;
        const num = MAX_NUM - Math.round(MAX_NUM * (per / 100));
        spacer.characters = '.'.repeat(num);
    }
}
class ProjectData {
    constructor(json, image) {
        this.id = json["id"];
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
    },
    shuffleArray: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
};
Promise.all([
    figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
    figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" })
])
    .then(() => main());
function main() {
    if (figma.currentPage.selection.length == 0) {
        figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).");
        figma.closePlugin();
        return;
    }
    (new NetworkHTML()).fetchProjectData()
        .then(_dataList => {
        let dataList = Util.shuffleArray(_dataList);
        getPjComponentsFromSelection().forEach((pjComp, i) => {
            let loopIndex = dataList.length - 1 < i ? (i % dataList.length) : i;
            pjComp.setData(dataList[loopIndex]);
        });
        figma.closePlugin();
    });
}
function getPjComponentsFromSelection() {
    var components = [];
    for (const node of figma.currentPage.selection) {
        if (node.name == "@Project") {
            const comp = new ProjectComponent(node);
            components.push(comp);
        }
    }
    return components;
}
