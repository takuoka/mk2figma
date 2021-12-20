import { ProjectData } from "../model/ProjectData";
import { Util } from "../util/Util";
import { FigmaUtil } from "../util/FigmaUitl";

export class ProjectComponent {

	static findComponents(nodes: readonly SceneNode[]) : ProjectComponent[] {
		var components: ProjectComponent[] = []
		for (const node of nodes) {
			if (node.name.includes("@Project")) {
				components.push(new ProjectComponent(node as FrameNode))
			}
		}
		return components
	}

	frame: FrameNode
	thubnail: RectangleNode
	title: TextNode
	money: TextNode
	time: TextNode
	progressText: TextNode
	progressBarSpacer: TextNode // SpecialProgressBar

	constructor(projectFrame: FrameNode) {
		this.frame = projectFrame
		this.thubnail = projectFrame.findOne(n => n.name == "@thumbnail") as RectangleNode
		this.title = projectFrame.findOne(n => n.name == "@title") as TextNode
		this.money = projectFrame.findOne(n => n.name == "@money") as TextNode
		this.time = projectFrame.findOne(n => n.name == "@time") as TextNode
		this.progressText = projectFrame.findOne(n => n.name == "@progress_num") as TextNode
		this.progressBarSpacer = projectFrame.findOne(n => n.name == "@progress_bar_spacer") as TextNode
	}

	setData(data: ProjectData) {
		if (this.title) {
			this.title.characters = data.title
		}
		if (this.money) {
			this.money.characters = Util.formatAsJPY(data.collectedMoney) + "円"
		}
		if (this.time) {
			this.time.characters = data.timeleftText			
		}
		if (this.progressText) {
			this.progressText.characters = data.percent.toString() + "%"			
		}
		if (this.progressBarSpacer) {
			this.updateSpecialProgressBar(data.percent, this.progressBarSpacer)
		}
		if (this.thubnail) {
			FigmaUtil.setImage(this.thubnail, data.image, data.id)
		}
	}

	private updateSpecialProgressBar(percent: number, spacer: TextNode) {
		const MAX_NUM = 90
		const per = percent > 100 ? 100 : percent
		const num = MAX_NUM - Math.round(MAX_NUM * (per/100))
		spacer.characters = '.'.repeat(num)
	}
}