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

/***/ "./src/code/network/NetworkHTML.ts":
/*!*****************************************!*\
  !*** ./src/code/network/NetworkHTML.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetworkHTML": () => (/* binding */ NetworkHTML)
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
class NetworkHTML {
    constructor() {
        figma.showUI(__html__, { visible: false }); // ui.html
        this.startListen();
    }
    fetchBoomProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.onFetchBoomProjectsData = (message => {
                    resolve(message.projects);
                });
                figma.ui.postMessage({ type: 'fetchBoomProjectsJSON' });
            });
        });
    }
    startListen() {
        figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            switch (msg.type) {
                case 'onFetchBoomProjectsData':
                    this.onFetchBoomProjectsData(msg);
                    break;
                case 'figmaNotify':
                    figma.notify(msg.text, { timeout: 1000 });
                    break;
            }
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
    networkHtml.fetchBoomProjects().then(projects => {
        console.log(projects);
        //👋ここまできた〜〜！
        // components.forEach((component, i) => {
        // let loopIndex: number = projects.length - 1 < i ? (i % projects.length) : i
        // component.setData(dataList[loopIndex])
        // })
        figma.closePlugin();
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ1U7QUFDdkM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdEQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBa0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvQ0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBLGlDQUFpQyxnQkFBZ0IsR0FBRztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQix1Q0FBdUMsK0JBQStCO0FBQ3RFLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxlQUFlO0FBQzVEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDMkM7QUFDM0M7QUFDTztBQUNQO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDckNBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtEQUFrRDtBQUN4RixzQ0FBc0Msa0RBQWtEO0FBQ3hGLHNDQUFzQyxzQ0FBc0M7QUFDNUUsc0NBQXNDLHNDQUFzQztBQUM1RTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwQk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCTztBQUNQO0FBQ0E7QUFDQSxzREFBc0QsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNrQjtBQUNiO0FBQ3BELHlCQUF5QixrRUFBb0Isd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5RkFBK0I7QUFDdEQsNEJBQTRCLDZEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvY29tcG9uZW50cy9Qcm9qZWN0Q29tcG9uZW50LnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvbmV0d29yay9OZXR3b3JrSFRNTC50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL3V0aWwvRmlnbWFVaXRsLnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvdXRpbC9Gb250TG9hZGVyLnRzIiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvdXRpbC9JbWFnZUNoYWNoZS50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS8uL3NyYy9jb2RlL3V0aWwvVXRpbC50cyIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWsyZmlnbWEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tazJmaWdtYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21rMmZpZ21hLy4vc3JjL2NvZGUvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uL3V0aWwvVXRpbFwiO1xuaW1wb3J0IHsgRmlnbWFVdGlsIH0gZnJvbSBcIi4uL3V0aWwvRmlnbWFVaXRsXCI7XG5leHBvcnQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdEZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBwcm9qZWN0RnJhbWU7XG4gICAgICAgIHRoaXMudGh1Ym5haWwgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aHVtYm5haWxcIik7XG4gICAgICAgIHRoaXMudGl0bGUgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aXRsZVwiKTtcbiAgICAgICAgdGhpcy5tb25leSA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQG1vbmV5XCIpO1xuICAgICAgICB0aGlzLnRpbWUgPSBwcm9qZWN0RnJhbWUuZmluZE9uZShuID0+IG4ubmFtZSA9PSBcIkB0aW1lXCIpO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGV4dCA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQHByb2dyZXNzX251bVwiKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNwYWNlciA9IHByb2plY3RGcmFtZS5maW5kT25lKG4gPT4gbi5uYW1lID09IFwiQHByb2dyZXNzX2Jhcl9zcGFjZXJcIik7XG4gICAgfVxuICAgIHN0YXRpYyBmaW5kQ29tcG9uZW50cyhub2Rlcykge1xuICAgICAgICB2YXIgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5hbWUuaW5jbHVkZXMoXCJAUHJvamVjdFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChuZXcgUHJvamVjdENvbXBvbmVudChub2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfVxuICAgIHNldERhdGEoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZS5jaGFyYWN0ZXJzID0gZGF0YS50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb25leSkge1xuICAgICAgICAgICAgdGhpcy5tb25leS5jaGFyYWN0ZXJzID0gVXRpbC5mb3JtYXRBc0pQWShkYXRhLmNvbGxlY3RlZE1vbmV5KSArIFwi5YaGXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGltZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lLmNoYXJhY3RlcnMgPSBkYXRhLnRpbWVsZWZ0VGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc1RleHQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NUZXh0LmNoYXJhY3RlcnMgPSBkYXRhLnBlcmNlbnQudG9TdHJpbmcoKSArIFwiJVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyU3BhY2VyKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNwZWNpYWxQcm9ncmVzc0JhcihkYXRhLnBlcmNlbnQsIHRoaXMucHJvZ3Jlc3NCYXJTcGFjZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRodWJuYWlsKSB7XG4gICAgICAgICAgICBGaWdtYVV0aWwuc2V0SW1hZ2UodGhpcy50aHVibmFpbCwgZGF0YS5pbWFnZSwgZGF0YS5pZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlU3BlY2lhbFByb2dyZXNzQmFyKHBlcmNlbnQsIHNwYWNlcikge1xuICAgICAgICBjb25zdCBNQVhfTlVNID0gOTA7XG4gICAgICAgIGNvbnN0IHBlciA9IHBlcmNlbnQgPiAxMDAgPyAxMDAgOiBwZXJjZW50O1xuICAgICAgICBjb25zdCBudW0gPSBNQVhfTlVNIC0gTWF0aC5yb3VuZChNQVhfTlVNICogKHBlciAvIDEwMCkpO1xuICAgICAgICBzcGFjZXIuY2hhcmFjdGVycyA9ICcuJy5yZXBlYXQobnVtKTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjbGFzcyBOZXR3b3JrSFRNTCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB2aXNpYmxlOiBmYWxzZSB9KTsgLy8gdWkuaHRtbFxuICAgICAgICB0aGlzLnN0YXJ0TGlzdGVuKCk7XG4gICAgfVxuICAgIGZldGNoQm9vbVByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRmV0Y2hCb29tUHJvamVjdHNEYXRhID0gKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1lc3NhZ2UucHJvamVjdHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2ZldGNoQm9vbVByb2plY3RzSlNPTicgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXJ0TGlzdGVuKCkge1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnb25GZXRjaEJvb21Qcm9qZWN0c0RhdGEnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRmV0Y2hCb29tUHJvamVjdHNEYXRhKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpZ21hTm90aWZ5JzpcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KG1zZy50ZXh0LCB7IHRpbWVvdXQ6IDEwMDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbWFnZUNhY2hlIH0gZnJvbSBcIi4vSW1hZ2VDaGFjaGVcIjtcbnZhciBpbWFnZUNhaGNlO1xuZXhwb3J0IGNvbnN0IEZpZ21hVXRpbCA9IHtcbiAgICBzZXRJbWFnZTogZnVuY3Rpb24gKHRhcmdldCwgaW1hZ2VEYXRhLCBpbWFnZUlkKSB7XG4gICAgICAgIGlmIChpbWFnZUNhaGNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW1hZ2VDYWhjZSA9IG5ldyBJbWFnZUNhY2hlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGltYWdlSGFzaCA9IFwiXCI7XG4gICAgICAgIHZhciBpc0ZhaWxlZCA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoaW1hZ2VEYXRhKS5oYXNoO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgaXNGYWlsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0ZhaWxlZCkge1xuICAgICAgICAgICAgaWYgKCFpbWFnZUNhaGNlLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIGltYWdlSGFzaCA9IGZpZ21hLmNyZWF0ZUltYWdlKGltYWdlQ2FoY2UuZ2V0UmFuZG9tKCkpLmhhc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbWFnZUNhaGNlLmFkZEltYWdlKGltYWdlRGF0YSwgaW1hZ2VJZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltYWdlSGFzaC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRGaWxscyA9IHRhcmdldFsnZmlsbHMnXTtcbiAgICAgICAgY29uc3QgbmV3RmlsbCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdJTUFHRScsXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgICAgICAgIHNjYWxlTW9kZTogJ0ZJTEwnLFxuICAgICAgICAgICAgaW1hZ2VIYXNoOiBpbWFnZUhhc2gsXG4gICAgICAgIH07XG4gICAgICAgIHRhcmdldFsnZmlsbHMnXSA9IFtuZXdGaWxsXTtcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgRm9udExvYWRlciA9IHtcbiAgICBsb2FkRm9udHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9OXCIsIHN0eWxlOiBcIlczXCIgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJIaXJhZ2lubyBLYWt1IEdvdGhpYyBQcm9OXCIsIHN0eWxlOiBcIlc2XCIgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJIaXJhZ2lubyBTYW5zXCIsIHN0eWxlOiBcIlczXCIgfSksXG4gICAgICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogXCJIaXJhZ2lubyBTYW5zXCIsIHN0eWxlOiBcIlc2XCIgfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGNsYXNzIEltYWdlQ2FjaGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLmlkTGlzdCA9IFtdO1xuICAgIH1cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXMubGVuZ3RoID09IDA7XG4gICAgfVxuICAgIGFkZEltYWdlKGltZywgaWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRXhpc3QoaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKGltZyk7XG4gICAgICAgICAgICB0aGlzLmlkTGlzdC5wdXNoKGlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2VDaGFjZSBsZW50Z2g6IFwiICsgdGhpcy5pbWFnZXMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRSYW5kb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmltYWdlcy5sZW5ndGgpXTtcbiAgICB9XG4gICAgaXNFeGlzdChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZExpc3QuaW5kZXhPZihpZCkgPj0gMDtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgVXRpbCA9IHtcbiAgICBmb3JtYXRBc0pQWTogZnVuY3Rpb24gKG1vbmV5KSB7XG4gICAgICAgIHZhciBzdHIgPSBtb25leS50b1N0cmluZygpO1xuICAgICAgICB3aGlsZSAoc3RyICE9IChzdHIgPSBzdHIucmVwbGFjZSgvXigtP1xcZCspKFxcZHszfSkvLCBcIiQxLCQyXCIpKSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBGb250TG9hZGVyIH0gZnJvbSAnLi91dGlsL0ZvbnRMb2FkZXInO1xuaW1wb3J0IHsgUHJvamVjdENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJvamVjdENvbXBvbmVudFwiO1xuaW1wb3J0IHsgTmV0d29ya0hUTUwgfSBmcm9tIFwiLi9uZXR3b3JrL05ldHdvcmtIVE1MXCI7XG5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgRm9udExvYWRlci5sb2FkRm9udHMoKS50aGVuKCgpID0+IG1haW4oKSk7IH0sIDEwMCk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID09IDApIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwi8J+RiyBQbGVzZSBzZWxlY3QgeW91ciBjb21wb25lbnRzICYgcmUtcnVuIHBsdWdpbiAo4oylICsg4oyYICsgUCkuXCIpO1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBQcm9qZWN0Q29tcG9uZW50LmZpbmRDb21wb25lbnRzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgY29uc3QgbmV0d29ya0h0bWwgPSBuZXcgTmV0d29ya0hUTUwoKTtcbiAgICBuZXR3b3JrSHRtbC5mZXRjaEJvb21Qcm9qZWN0cygpLnRoZW4ocHJvamVjdHMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgICAgIC8v8J+Ri+OBk+OBk+OBvuOBp+OBjeOBn+OAnOOAnO+8gVxuICAgICAgICAvLyBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCwgaSkgPT4ge1xuICAgICAgICAvLyBsZXQgbG9vcEluZGV4OiBudW1iZXIgPSBwcm9qZWN0cy5sZW5ndGggLSAxIDwgaSA/IChpICUgcHJvamVjdHMubGVuZ3RoKSA6IGlcbiAgICAgICAgLy8gY29tcG9uZW50LnNldERhdGEoZGF0YUxpc3RbbG9vcEluZGV4XSlcbiAgICAgICAgLy8gfSlcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==