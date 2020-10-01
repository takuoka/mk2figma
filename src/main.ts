var proms = figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" })
proms.then( ()=> main() )

function main(){
	figma.showUI(__html__, { visible: false })
	figma.ui.postMessage({ type: 'fetchProjectsJSON' })
	// figma.closePlugin()
}

function onFetchPrjectObj(msg) {
	console.log("---onFetchPrjectObj---")
	console.log(msg)

	let projectJsonList: Object[] = msg.projects
	let imageList: Uint8Array[] = msg.images

	let projects: ProjectData[] = []
	for (var i = 0; i < projectJsonList.length; i++) {
		projects.push(new ProjectData(projectJsonList[i], imageList[i]))
	}
	console.log(projects)

	getPjComponents().forEach((pjComp, i) => {
		fillPjComponent(pjComp, projects[i])//👋 TODO:ループ
	})
}

function fillPjComponent(pjFrame: FrameNode, pjData: ProjectData) {
	console.log("---fillPjComponent----")
	console.log(pjData)

	const imageNode = pjFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
	setImage(imageNode, pjData.image)

	const titleNode = pjFrame.findOne(n => n.name == "@title") as TextNode
	titleNode.characters = pjData.json["title"]
}

// ---------------------------------------------------------------------------------------------
// Bind
// ---------------------------------------------------------------------------------------------


figma.ui.onmessage = async msg => {
	switch (msg.type) {

		case 'onFetchProjectsData':
			onFetchPrjectObj(msg)
			break;
	}
};


// ---------------------------------------------------------------------------------------------
// Util
// ---------------------------------------------------------------------------------------------


class ProjectData {
	json: any
	image: Uint8Array

	constructor(pj: any, image: Uint8Array) {
		this.json = pj
		this.image = image
	}
}


function getPjComponents() : FrameNode[] {
	var pjFrameList: FrameNode[] = []
	for (const node of figma.currentPage.children) {
		if (node.name == "@Project") {
			pjFrameList.push(node as FrameNode)
		}
	}
	return pjFrameList
}

function getPjComponentsFromSelection() : FrameNode[] {
	var pjFrameList: FrameNode[] = []
	for (const node of figma.currentPage.selection) {
		if (node.name == "@Project") {
			pjFrameList.push(node as FrameNode)
		}
	}
	return pjFrameList
}

function setImage(target: SceneNode, imgData: Uint8Array) {
	const imageHash = figma.createImage(imgData).hash;
	const currentFills = target['fills'];
	const newFill = {
		type: 'IMAGE',
		opacity: 1,
		blendMode: 'NORMAL',
		scaleMode: 'FILL',
		imageHash: imageHash,
	};
	target['fills'] = [newFill]
}

// ---------------------------------------------------------------------------------------------
// Experiment
// ---------------------------------------------------------------------------------------------

function exam_get_first_thumb_node() : RectangleNode {
	for (const node of figma.currentPage.children) {
		if (node.name == "@Project") {
			const pjFrame = node as FrameNode    
			const imageNode = pjFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
			return imageNode//とれてる
		}
	}
}