(()=>{"use strict";const t={loadFonts:function(){return t=this,e=void 0,n=function*(){return Promise.all([figma.loadFontAsync({family:"Hiragino Kaku Gothic ProN",style:"W3"}),figma.loadFontAsync({family:"Hiragino Kaku Gothic ProN",style:"W6"}),figma.loadFontAsync({family:"Hiragino Sans",style:"W3"}),figma.loadFontAsync({family:"Hiragino Sans",style:"W6"})])},new((i=void 0)||(i=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}c((n=n.apply(t,e||[])).next())}));var t,e,i,n}};class e{constructor(){this.images=[],this.idList=[]}isEmpty(){return 0==this.images.length}addImage(t,e){this.isExist(e)||(this.images.push(t),this.idList.push(e),console.log("ImageChace lentgh: "+this.images.length))}getRandom(){return this.images[Math.floor(Math.random()*this.images.length)]}isExist(t){return this.idList.indexOf(t)>=0}}var i;class n{constructor(t){this.frame=t,this.thubnail=t.findOne((t=>"@thumbnail"==t.name)),this.title=t.findOne((t=>"@title"==t.name)),this.money=t.findOne((t=>"@money"==t.name)),this.time=t.findOne((t=>"@time"==t.name)),this.progressText=t.findOne((t=>"@progress_num"==t.name)),this.progressBarSpacer=t.findOne((t=>"@progress_bar_spacer"==t.name))}static findComponents(t){var e=[];for(const i of t)i.name.includes("@Project")&&e.push(new n(i));return e}setData(t){this.title&&(this.title.characters=t.title),this.money&&(this.money.characters=function(t){for(var e=t.toString();e!=(e=e.replace(/^(-?\d+)(\d{3})/,"$1,$2")););return e}(t.collectedMoney)+"円"),this.time&&(this.time.characters=t.timeleftText),this.progressText&&(this.progressText.characters=t.percent.toString()+"%"),this.progressBarSpacer&&this.updateSpecialProgressBar(t.percent,this.progressBarSpacer),this.thubnail&&function(t,n,s){null==i&&(i=new e);var a="",o=!1;try{a=figma.createImage(n).hash}catch(t){console.log(t),o=!0}if(o?i.isEmpty()||(a=figma.createImage(i.getRandom()).hash):i.addImage(n,s),0==a.length)return;t.fills;const r={type:"IMAGE",opacity:1,blendMode:"NORMAL",scaleMode:"FILL",imageHash:a};t.fills=[r]}(this.thubnail,t.image,t.id)}updateSpecialProgressBar(t,e){const i=t>100?100:t,n=90-Math.round(i/100*90);e.characters=".".repeat(n)}}class s{constructor(t,e){this.id=t.id,this.title=t.title,this.collectedMoney=t.collected_money,this.timeleftText=t.time_left_label,this.percent=t.percent,this.image=e}}var a=function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{c(n.next(t))}catch(t){a(t)}}function r(t){try{c(n.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}c((n=n.apply(t,e||[])).next())}))};class o{constructor(){figma.showUI(__html__,{visible:!1}),figma.ui.onmessage=t=>a(this,void 0,void 0,(function*(){switch(t.type){case"onFetchProjectsData":let i=t.projects,n=t.images,a=[];for(var e=0;e<i.length;e++)a.push(new s(i[e],n[e]));this.onSuccessToFetchProjectData(a);break;case"figmaNotify":figma.notify(t.text,{timeout:1e3})}}))}fetchProjectData(t){return a(this,void 0,void 0,(function*(){return new Promise(((e,i)=>{this.onSuccessToFetchProjectData=t=>e(t),figma.ui.postMessage({type:"fetchProjectsJSON",limit:t})}))}))}}setTimeout((function(){t.loadFonts().then((()=>function(){if(0==figma.currentPage.selection.length)return figma.notify("👋🐔 Plese select your components & re-run plugin (⌥ + ⌘ + P)."),void figma.closePlugin();const t=n.findComponents(figma.currentPage.selection),e=new o,i=Math.max(30,2*t.length);e.fetchProjectData(i).then((e=>{t.forEach(((t,i)=>{let n=e.length-1<i?i%e.length:i;t.setData(e[n])})),figma.closePlugin()}))}()))}),100)})();