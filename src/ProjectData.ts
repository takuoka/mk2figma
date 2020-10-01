class ProjectData {
	title: string
	collectedMoney: number
	timeleftText: string
	image: Uint8Array
	percent: number

	constructor(json: any, image: Uint8Array) {
		this.title = json["title"]
		this.collectedMoney = json["collected_money"]
		this.timeleftText = json["time_left_label"]
		this.percent = json["percent"]
		this.image = image
	}
}

