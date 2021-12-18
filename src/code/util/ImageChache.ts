export class ImageCache {
    private images: Uint8Array[]
    private idList: number[]

    constructor() {
        this.images = []
        this.idList = []
    }

    isEmpty(): boolean {
        return this.images.length == 0
    }

    addImage(img: Uint8Array, id: number) {        
        if (!this.isExist(id)) {
            this.images.push(img)
            this.idList.push(id)
            console.log("ImageChace lentgh: " + this.images.length)	
        }
    }

    getRandom(): Uint8Array {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    private isExist(id: number): boolean {
        return this.idList.indexOf(id) >= 0
    }
}