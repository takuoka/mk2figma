export class BoomProjectData {
	id: number
	title: string
    users: number
	url: string
	image: Uint8Array
	startAt: number

	constructor(json: any, image: Uint8Array) {
        this.id = json["id"]
        this.title = json["title"]
        this.users = json["users"]
        this.url = json["url"]
        this.image = image
        this.startAt = json["start_at"]
	}
}

