class ProjectData {
	id: number
	title: string
	collectedMoney: number
	timeleftText: string
	image: Uint8Array
	percent: number

	constructor(json: any, image: Uint8Array) {
		this.id = json["id"]
		this.title = json["title"]
		this.collectedMoney = json["collected_money"]
		this.timeleftText = json["time_left_label"]
		this.percent = json["percent"]
		this.image = image
	}
}

