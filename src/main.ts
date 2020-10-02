Promise.all([
	figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
	figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" })
])
.then( ()=> main() )

function main(){
	(new NetworkHTML()).fetchProjectData()
		.then(dataList => {			
			getPjComponentsFromPage().forEach((pjComp, i) => {
				let loopIndex: number = dataList.length - 1 < i ? (i % dataList.length) : i
				pjComp.setData(dataList[loopIndex])
			})
			figma.closePlugin()
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
