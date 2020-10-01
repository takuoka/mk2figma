class ProjectComponent {
	frame: FrameNode
	imageNode: RectangleNode
	titleNode: TextNode

	constructor(projectFrame: FrameNode) {
		this.frame = projectFrame
		this.imageNode = projectFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
		this.titleNode = projectFrame.findOne(n => n.name == "@title") as TextNode
	}

	setData(data: ProjectData) {
		setImage(this.imageNode, data.image)
		this.titleNode.characters = data.json["title"]
	}

}

// Util

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
