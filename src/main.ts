Promise.all([
	figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
	figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" })
])
.then( ()=> main() )

function main(){
	if (figma.currentPage.selection.length == 0) {
		figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).")
		figma.closePlugin()
		return
	}
	(new NetworkHTML()).fetchProjectData()
		.then(_dataList => {		
			let dataList: ProjectData[] = Util.shuffleArray(_dataList)
			getPjComponentsFromSelection().forEach((pjComp, i) => {
				let loopIndex: number = dataList.length - 1 < i ? (i % dataList.length) : i
				pjComp.setData(dataList[loopIndex])
			})
			figma.closePlugin()
		})
}

function getPjComponentsFromSelection() : ProjectComponent[] {
	var components: ProjectComponent[] = []
	for (const node of figma.currentPage.selection) {
		if (node.name == "@Project") {
			const comp = new ProjectComponent(node as FrameNode)
			components.push(comp)
		}
	}
	return components
}
