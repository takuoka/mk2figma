Promise.all([
	figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
	figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" })
])
.then( ()=> main() )

function main(){
	figma.showUI(__html__, { visible: false })
	figma.ui.postMessage({ type: 'fetchProjectsJSON' })
	// figma.closePlugin()
}

figma.ui.onmessage = async msg => {
	switch (msg.type) {
		case 'onFetchProjectsData':
			onFetchPrjectObj(msg)
			break;
	}
};

function onFetchPrjectObj(msg) {
	let jsonList: Object[] = msg.projects
	let imageList: Uint8Array[] = msg.images

	let dataList: ProjectData[] = []
	for (var i = 0; i < jsonList.length; i++) {
		dataList.push(new ProjectData(jsonList[i], imageList[i]))
	}

	getPjComponentsFromPage().forEach((pjComp, i) => {
		let maxIndex = jsonList.length - 1
		var loopIndex: number = maxIndex < i ? (i % jsonList.length) : i
		pjComp.setData(dataList[loopIndex])
	})
}

function getPjComponentsFromPage() : ProjectComponent[] {
	var pjCompList: ProjectComponent[] = []
	//	for (const node of figma.currentPage.selection)
	for (const node of figma.currentPage.children) {
		if (node.name == "@Project") {
			const comp = new ProjectComponent(node as FrameNode)
			pjCompList.push(comp)
		}
	}
	return pjCompList
}
