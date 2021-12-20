/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code/components/ProjectComponent.ts":
/*!*************************************************!*\
  !*** ./src/code/components/ProjectComponent.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectComponent": () => (/* binding */ ProjectComponent)
/* harmony export */ });
/* harmony import */ var _util_Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Util */ "./src/code/util/Util.ts");
/* harmony import */ var _util_FigmaUitl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/FigmaUitl */ "./src/code/util/FigmaUitl.ts");


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
    static findComponents(nodes) {
        var components = [];
        for (const node of nodes) {
            if (node.name.includes("@Project")) {
                components.push(new ProjectComponent(node));
            }
        }
        return components;
    }
    setData(data) {
        if (this.title) {
            this.title.characters = data.title;
        }
        if (this.money) {
            this.money.characters = _util_Util__WEBPACK_IMPORTED_MODULE_0__.Util.formatAsJPY(data.collectedMoney) + "円";
        }
        if (this.time) {
            this.time.characters = data.timeleftText;
        }
        if (this.progressText) {
            this.progressText.characters = data.percent.toString() + "%";
        }
        if (this.progressBarSpacer) {
            this.updateSpecialProgressBar(data.percent, this.progressBarSpacer);
        }
        if (this.thubnail) {
            _util_FigmaUitl__WEBPACK_IMPORTED_MODULE_1__.FigmaUtil.setImage(this.thubnail, data.image, data.id);
        }
    }
    updateSpecialProgressBar(percent, spacer) {
        const MAX_NUM = 90;
        const per = percent > 100 ? 100 : percent;
        const num = MAX_NUM - Math.round(MAX_NUM * (per / 100));
        spacer.characters = '.'.repeat(num);
    }
}


/***/ }),

/***/ "./src/code/model/ProjectData.ts":
/*!***************************************!*\
  !*** ./src/code/model/ProjectData.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectData": () => (/* binding */ ProjectData)
/* harmony export */ });
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


/***/ }),

/***/ "./src/code/network/NetworkHTML.ts":
/*!*****************************************!*\
  !*** ./src/code/network/NetworkHTML.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetworkHTML": () => (/* binding */ NetworkHTML)
/* harmony export */ });
/* harmony import */ var _model_ProjectData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/ProjectData */ "./src/code/model/ProjectData.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

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
                        dataList.push(new _model_ProjectData__WEBPACK_IMPORTED_MODULE_0__.ProjectData(jsonList[i], imageList[i]));
                    }
                    this.onSuccessToFetchProjectData(dataList);
                    break;
                case 'figmaNotify':
                    figma.notify(msg.text, { timeout: 1000 });
            }
        });
    }
    fetchProjectData(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.onSuccessToFetchProjectData = (dataList => resolve(dataList));
                figma.ui.postMessage({ type: 'fetchProjectsJSON', limit: limit });
            });
        });
    }
}


/***/ }),

/***/ "./src/code/util/FigmaUitl.ts":
/*!************************************!*\
  !*** ./src/code/util/FigmaUitl.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FigmaUtil": () => (/* binding */ FigmaUtil)
/* harmony export */ });
/* harmony import */ var _ImageChache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageChache */ "./src/code/util/ImageChache.ts");

var imageCahce;
const FigmaUtil = {
    setImage: function (target, imageData, imageId) {
        if (imageCahce == undefined) {
            imageCahce = new _ImageChache__WEBPACK_IMPORTED_MODULE_0__.ImageCache();
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


/***/ }),

/***/ "./src/code/util/FontLoader.ts":
/*!*************************************!*\
  !*** ./src/code/util/FontLoader.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FontLoader": () => (/* binding */ FontLoader)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FontLoader = {
    loadFonts: function () {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
                figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W6" }),
                figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" }),
                figma.loadFontAsync({ family: "Hiragino Sans", style: "W6" })
            ]);
        });
    }
};


/***/ }),

/***/ "./src/code/util/ImageChache.ts":
/*!**************************************!*\
  !*** ./src/code/util/ImageChache.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageCache": () => (/* binding */ ImageCache)
/* harmony export */ });
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


/***/ }),

/***/ "./src/code/util/Util.ts":
/*!*******************************!*\
  !*** ./src/code/util/Util.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
const Util = {
    formatAsJPY: function (money) {
        var str = money.toString();
        while (str != (str = str.replace(/^(-?\d+)(\d{3})/, "$1,$2")))
            ;
        return str;
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/code/main.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_FontLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/FontLoader */ "./src/code/util/FontLoader.ts");
/* harmony import */ var _components_ProjectComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ProjectComponent */ "./src/code/components/ProjectComponent.ts");
/* harmony import */ var _network_NetworkHTML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./network/NetworkHTML */ "./src/code/network/NetworkHTML.ts");



setTimeout(function () { _util_FontLoader__WEBPACK_IMPORTED_MODULE_0__.FontLoader.loadFonts().then(() => main()); }, 100);
function main() {
    if (figma.currentPage.selection.length == 0) {
        figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).");
        figma.closePlugin();
        return;
    }
    const components = _components_ProjectComponent__WEBPACK_IMPORTED_MODULE_1__.ProjectComponent.findComponents(figma.currentPage.selection);
    const networkHtml = new _network_NetworkHTML__WEBPACK_IMPORTED_MODULE_2__.NetworkHTML();
    const limit = Math.max(30, components.length * 2);
    networkHtml.fetchProjectData(limit).then(dataList => {
        components.forEach((component, i) => {
            let loopIndex = dataList.length - 1 < i ? (i % dataList.length) : i;
            component.setData(dataList[loopIndex]);
        });
        figma.closePlugin();
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0Isd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5RkFBK0I7QUFDdEQsNEJBQTRCLDZEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL2NvbXBvbmVudHMvUHJvamVjdENvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL21vZGVsL1Byb2plY3REYXRhLnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvbmV0d29yay9OZXR3b3JrSFRNTC50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL3V0aWwvRmlnbWFVaXRsLnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvdXRpbC9Gb250TG9hZGVyLnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvdXRpbC9JbWFnZUNoYWNoZS50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL3V0aWwvVXRpbC50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWsyZmlnbWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uL3V0aWwvVXRpbFwiO1xuaW1wb3J0IHsgRmlnbWFVdGlsIH0gZnJvbSBcIi4uL3V0aWwvRmlnbWFVaXRsXCI7XG5leHBvcnQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdEZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBwcm9qZWN0RnJhbWU7XG4gICAgICAgIHRoaXMudGh1Ym5haWwgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aHVtYm5haWxcIik7XG4gICAgICAgIHRoaXMudGl0bGUgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aXRsZVwiKTtcbiAgICAgICAgdGhpcy5tb25leSA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQG1vbmV5XCIpO1xuICAgICAgICB0aGlzLnRpbWUgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aW1lXCIpO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGV4dCA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQHByb2dyZXNzX251bVwiKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNwYWNlciA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQHByb2dyZXNzX2Jhcl9zcGFjZXJcIik7XG4gICAgfVxuICAgIHN0YXRpYyBmaW5kQ29tcG9uZW50cyhub2Rlcykge1xuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5hbWUuaW5jbHVkZXMoXCJAUHJvamVjdFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChuZXcgUHJvamVjdENvbXBvbmVudChub2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxuICAgIHNldERhdGEoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZS5jaGFyYWN0ZXJzID0gZGF0YS50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb25leSkge1xuICAgICAgICAgICAgdGhpcy5tb25leS5jaGFyYWN0ZXJzID0gVXRpbC5mb3JtYXRBc0pQWShkYXRhLmNvbGxlY3RlZE1vbmV5KSArIFwi5YaGXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGltZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lLmNoYXJhY3RlcnMgPSBkYXRhLnRpbWVsZWZ0VGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1RleHQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0LmNoYXJhY3RlcnMgPSBkYXRhLnBlcmNlbnQudG9TdHJpbmcoKSArIFwiJVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyU3BhY2VyKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNwZWNpYWxQcm9ncmVzc0JhcihkYXRhLnBlcmNlbnQsIHRoaXMucHJvZ3Jlc3NCYXJTcGFjZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRodWJuYWlsKSB7XG4gICAgICAgICAgICBGaWdtYVV0aWwuc2V0SW1hZ2UodGhpcy50aHVibmFpbCwgZGF0YS5pbWFnZSwgZGF0YS5pZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlU3BlY2lhbFByb2dyZXNzQmFyKHBlcmNlbnQsIHNwYWNlcikge1xuICAgICAgICBjb25zdCBNQVhfTlVNID0gOTA7XG4gICAgICAgIGNvbnN0IHBlciA9IHBlcmNlbnQgPiAxMDAgPyAxMDAgOiBwZXJjZW50O1xuICAgICAgICBjb25zdCBudW0gPSBNQVhfTlVNIC0gTWF0aC5yb3VuZChNQVhfTlVNICogKHBlciAvIDEwMCkpO1xuICAgICAgICBzcGFjZXIuY2hhcmFjdGVycyA9ICcuJy5yZXBlYXQobnVtKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUHJvamVjdERhdGEge1xuICAgIGNvbnN0cnVjdG9yKGpzb24sIGltYWdlKSB7XG4gICAgICAgIHRoaXMuaWQgPSBqc29uW1wiaWRcIl07XG4gICAgICAgIHRoaXMudGl0bGUgPSBqc29uW1widGl0bGVcIl07XG4gICAgICAgIHRoaXMuY29sbGVjdGVkTW9uZXkgPSBqc29uW1wiY29sbGVjdGVkX21vbmV5XCJdO1xuICAgICAgICB0aGlzLnRpbWVsZWZ0VGV4dCA9IGpzb25bXCJ0aW1lX2xlZnRfbGFiZWxcIl07XG4gICAgICAgIHRoaXMucGVyY2VudCA9IGpzb25bXCJwZXJjZW50XCJdO1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBQcm9qZWN0RGF0YSB9IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0RGF0YVwiO1xuZXhwb3J0IGNsYXNzIE5ldHdvcmtIVE1MIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHZpc2libGU6IGZhbHNlIH0pOyAvLyBuZXR3b3JrLmh0bWxcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ29uRmV0Y2hQcm9qZWN0c0RhdGEnOlxuICAgICAgICAgICAgICAgICAgICBsZXQganNvbkxpc3QgPSBtc2cucHJvamVjdHM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZUxpc3QgPSBtc2cuaW1hZ2VzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3QucHVzaChuZXcgUHJvamVjdERhdGEoanNvbkxpc3RbaV0sIGltYWdlTGlzdFtpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzVG9GZXRjaFByb2plY3REYXRhKGRhdGFMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmlnbWFOb3RpZnknOlxuICAgICAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkobXNnLnRleHQsIHsgdGltZW91dDogMTAwMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZldGNoUHJvamVjdERhdGEobGltaXQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3NUb0ZldGNoUHJvamVjdERhdGEgPSAoZGF0YUxpc3QgPT4gcmVzb2x2ZShkYXRhTGlzdCkpO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2ZldGNoUHJvamVjdHNKU09OJywgbGltaXQ6IGxpbWl0IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEltYWdlQ2FjaGUgfSBmcm9tIFwiLi9JbWFnZUNoYWNoZVwiO1xudmFyIGltYWdlQ2FoY2U7XG5leHBvcnQgY29uc3QgRmlnbWFVdGlsID0ge1xuICAgIHNldEltYWdlOiBmdW5jdGlvbiAodGFyZ2V0LCBpbWFnZURhdGEsIGltYWdlSWQpIHtcbiAgICAgICAgaWYgKGltYWdlQ2FoY2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbWFnZUNhaGNlID0gbmV3IEltYWdlQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW1hZ2VIYXNoID0gXCJcIjtcbiAgICAgICAgdmFyIGlzRmFpbGVkID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShpbWFnZURhdGEpLmhhc2g7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICBpc0ZhaWxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRmFpbGVkKSB7XG4gICAgICAgICAgICBpZiAoIWltYWdlQ2FoY2UuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoaW1hZ2VDYWhjZS5nZXRSYW5kb20oKSkuaGFzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlQ2FoY2UuYWRkSW1hZ2UoaW1hZ2VEYXRhLCBpbWFnZUlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1hZ2VIYXNoLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudEZpbGxzID0gdGFyZ2V0WydmaWxscyddO1xuICAgICAgICBjb25zdCBuZXdGaWxsID0ge1xuICAgICAgICAgICAgdHlwZTogJ0lNQUdFJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICBibGVuZE1vZGU6ICdOT1JNQUwnLFxuICAgICAgICAgICAgc2NhbGVNb2RlOiAnRklMTCcsXG4gICAgICAgICAgICBpbWFnZUhhc2g6IGltYWdlSGFzaCxcbiAgICAgICAgfTtcbiAgICAgICAgdGFyZ2V0WydmaWxscyddID0gW25ld0ZpbGxdO1xuICAgIH1cbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBGb250TG9hZGVyID0ge1xuICAgIGxvYWRGb250czogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkhpcmFnaW5vIEtha3UgR290aGljIFByb05cIiwgc3R5bGU6IFwiVzNcIiB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkhpcmFnaW5vIEtha3UgR290aGljIFByb05cIiwgc3R5bGU6IFwiVzZcIiB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkhpcmFnaW5vIFNhbnNcIiwgc3R5bGU6IFwiVzNcIiB9KSxcbiAgICAgICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5OiBcIkhpcmFnaW5vIFNhbnNcIiwgc3R5bGU6IFwiVzZcIiB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCJleHBvcnQgY2xhc3MgSW1hZ2VDYWNoZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMuaWRMaXN0ID0gW107XG4gICAgfVxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcy5sZW5ndGggPT0gMDtcbiAgICB9XG4gICAgYWRkSW1hZ2UoaW1nLCBpZCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFeGlzdChpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goaW1nKTtcbiAgICAgICAgICAgIHRoaXMuaWRMaXN0LnB1c2goaWQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbWFnZUNoYWNlIGxlbnRnaDogXCIgKyB0aGlzLmltYWdlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFJhbmRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuaW1hZ2VzLmxlbmd0aCldO1xuICAgIH1cbiAgICBpc0V4aXN0KGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkTGlzdC5pbmRleE9mKGlkKSA+PSAwO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBVdGlsID0ge1xuICAgIGZvcm1hdEFzSlBZOiBmdW5jdGlvbiAobW9uZXkpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1vbmV5LnRvU3RyaW5nKCk7XG4gICAgICAgIHdoaWxlIChzdHIgIT0gKHN0ciA9IHN0ci5yZXBsYWNlKC9eKC0/XFxkKykoXFxkezN9KS8sIFwiJDEsJDJcIikpKVxuICAgICAgICAgICAgO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEZvbnRMb2FkZXIgfSBmcm9tICcuL3V0aWwvRm9udExvYWRlcic7XG5pbXBvcnQgeyBQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9qZWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBOZXR3b3JrSFRNTCB9IGZyb20gXCIuL25ldHdvcmsvTmV0d29ya0hUTUxcIjtcbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBGb250TG9hZGVyLmxvYWRGb250cygpLnRoZW4oKCkgPT4gbWFpbigpKTsgfSwgMTAwKTtcbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgaWYgKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPT0gMCkge1xuICAgICAgICBmaWdtYS5ub3RpZnkoXCLwn5GLIFBsZXNlIHNlbGVjdCB5b3VyIGNvbXBvbmVudHMgJiByZS1ydW4gcGx1Z2luICjijKUgKyDijJggKyBQKS5cIik7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29tcG9uZW50cyA9IFByb2plY3RDb21wb25lbnQuZmluZENvbXBvbmVudHMoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICBjb25zdCBuZXR3b3JrSHRtbCA9IG5ldyBOZXR3b3JrSFRNTCgpO1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5tYXgoMzAsIGNvbXBvbmVudHMubGVuZ3RoICogMik7XG4gICAgbmV0d29ya0h0bWwuZmV0Y2hQcm9qZWN0RGF0YShsaW1pdCkudGhlbihkYXRhTGlzdCA9PiB7XG4gICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50LCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgbG9vcEluZGV4ID0gZGF0YUxpc3QubGVuZ3RoIC0gMSA8IGkgPyAoaSAlIGRhdGFMaXN0Lmxlbmd0aCkgOiBpO1xuICAgICAgICAgICAgY29tcG9uZW50LnNldERhdGEoZGF0YUxpc3RbbG9vcEluZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9