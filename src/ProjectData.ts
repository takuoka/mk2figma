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
		this.collectedMoney = json["project"]["collected_money"]
		this.timeleftText = json["project"]["time_left_label"]
		this.percent = json["project"]["percent"]
		this.image = image
	}
}

