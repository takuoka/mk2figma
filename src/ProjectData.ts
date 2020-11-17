class ProjectData {
	id: number
	title: string
	collectedMoney: number
	timeleftText: string
	image: Uint8Array
	percent: number
	elapsed_time_label: string
	tagName: string

	constructor(json: any, image: Uint8Array) {
		this.id = json["id"]
		this.title = json["title"]
		this.collectedMoney = json["collected_money"]
		this.timeleftText = json["time_left_label"]
		this.percent = json["percent"]
		this.image = image
		this.elapsed_time_label = json["elapsed_time_label"]
		this.tagName = json["tags"][0]["name"]
		console.log("❗❗❗❗❗❗❗❗❗❗")
		console.log(this.tagName)
		console.log(json["tags"])
		console.log(this.tagName)
	}
}

