setTimeout(function() { FontLoader.loadFonts().then( ()=> main() ) }, 100)

function main(){
	if (figma.currentPage.selection.length == 0) {
		figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).")
		figma.closePlugin()
		return
	}

	const components: ProjectComponent[] = getPjComponentsFromSelection();

	// 🚧👋 limit = components.length * 2
	(new NetworkHTML()).fetchProjectData(Math.max(30, components.length * 2)).then(dataList => {		
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
		if (node.name.includes("@Project")) {
			const comp = new ProjectComponent(node as FrameNode)
			components.push(comp)
		}
	}
	return components
}
