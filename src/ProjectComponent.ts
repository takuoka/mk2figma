class ProjectComponent {
	frame: FrameNode
	thubnail: RectangleNode
	title: TextNode
	money: TextNode
	time: TextNode
	progressText: TextNode
	progressBar: RectangleNode

	constructor(projectFrame: FrameNode) {
		this.frame = projectFrame
		this.thubnail = projectFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
		this.title = projectFrame.findOne(n => n.name == "@title") as TextNode
		this.money = projectFrame.findOne(n => n.name == "@money") as TextNode
		this.time = projectFrame.findOne(n => n.name == "@time") as TextNode
		this.progressText = projectFrame.findOne(n => n.name == "@progress_num") as TextNode
		this.progressBar = projectFrame.findOne(n => n.name == "@progress_bar") as RectangleNode
	}

	setData(data: ProjectData) {
		FigmaUtil.setImage(this.thubnail, data.image)
		this.title.characters = data.title
		this.money.characters = Util.formatAsJPY(data.collectedMoney) + "円"
		this.time.characters = data.timeleftText
		this.progressText.characters = data.percent.toString() + "%"
		this.updateProgressBar(data.percent, this.progressBar)
	}

	private updateProgressBar(percent: number, bar: SceneNode) {
		const per = percent > 100 ? 100 : percent
		const position = per / 100
		const activeColor = new RGB("#A5F117")
		const areaColor = new RGB("#EAEBEE")
		const gradientFill = {
			type: 'GRADIENT_LINEAR',
			gradientTransform: [[1, 0, 0], [0, 1, 0]],
			gradientStops: [
				{position: 0 , color: {r: activeColor.r01, g: activeColor.g01, b: activeColor.b01, a: 1}},
				{position: position , color: {r: activeColor.r01, g: activeColor.g01, b: activeColor.b01, a: 1}},
				{position: position , color: {r: areaColor.r01, g: areaColor.g01, b: areaColor.b01, a: 1}},
				{position: 1 , color: {r: areaColor.r01, g: areaColor.g01, b: areaColor.b01, a: 1}},
			]
		};
		bar['fills'] = [gradientFill]
	}
}