Promise.all([
	figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
	figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W6" }),
	figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" }),
	figma.loadFontAsync({ family: "Hiragino Sans", style: "W6" })
])
.then( ()=> main() )

function main(){
	if (figma.currentPage.selection.length == 0) {
		figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).")
		figma.closePlugin()
		return
	}

	const components: ProjectComponent[] = getPjComponentsFromSelection();

	(new NetworkHTML()).fetchProjectData(components.length).then(dataList => {		
		components.forEach((component, i) => {
			let loopIndex: number = dataList.length - 1 < i ? (i % dataList.length) : i
			component.setData(dataList[loopIndex])
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
		var frameNode = node as FrameNode
		if (frameNode) {
			var pjNode = frameNode.findOne(n => n.name == "@Project") as FrameNode
			if (pjNode) {
				components.push(new ProjectComponent(pjNode as FrameNode))	
			}
		}
	}
	return components
}
