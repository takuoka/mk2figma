import { FontLoader } from './util/FontLoader';
import { ProjectComponent } from "./components/ProjectComponent";
import { NetworkHTML } from "./network/NetworkHTML";

setTimeout(function() { FontLoader.loadFonts().then( ()=> main() ) }, 100)

function main(){
	if (figma.currentPage.selection.length == 0) {
		figma.notify("👋 Plese select your components & re-run plugin (⌥ + ⌘ + P).")
		figma.closePlugin()
		return
	}

	const components: ProjectComponent[] = ProjectComponent.findComponents(figma.currentPage.selection)

	const networkHtml = new NetworkHTML()
	const limit = Math.max(30, components.length * 2)
	networkHtml.fetchProjectData(limit).then(dataList => {		
		components.forEach((component, i) => {
			let loopIndex: number = dataList.length - 1 < i ? (i % dataList.length) : i
			component.setData(dataList[loopIndex])
		})
		figma.closePlugin()
	})
}