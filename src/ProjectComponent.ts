class ProjectComponent {
	frame: FrameNode
	thubnail: RectangleNode
	title: TextNode
	money: TextNode
	time: TextNode
	progressText: TextNode
	progressArea: RectangleNode
	progressBar: RectangleNode

	constructor(projectFrame: FrameNode) {
		this.frame = projectFrame
		this.thubnail = projectFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
		this.title = projectFrame.findOne(n => n.name == "@title") as TextNode
		this.money = projectFrame.findOne(n => n.name == "@money") as TextNode
		this.time = projectFrame.findOne(n => n.name == "@time") as TextNode
		this.progressText = projectFrame.findOne(n => n.name == "@progress_num") as TextNode
		this.progressArea = projectFrame.findOne(n => n.name == "@progress_area") as RectangleNode
		this.progressBar = projectFrame.findOne(n => n.name == "@progress_bar") as RectangleNode
	}

	setData(data: ProjectData) {
		FigmaUtil.setImage(this.thubnail, data.image)
		this.title.characters = data.title
		this.money.characters = Util.formatAsJPY(data.collectedMoney) + "円"
		this.time.characters = data.timeleftText
		this.progressText.characters = data.percent.toString()
	}
}
