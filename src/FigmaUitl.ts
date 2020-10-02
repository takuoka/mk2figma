var spareImages: Uint8Array[] = []
var spareImageIdList: number[] = []

const FigmaUtil = {
	setImage: function(target: SceneNode, imgData: Uint8Array, imageId: number) {

		var imageHash: string = ""
		var isUnsupportedImage = false

		try {
			imageHash = figma.createImage(imgData).hash;			
		} catch (error) {
			console.log(error)
			isUnsupportedImage = true			
		}

		if (isUnsupportedImage) {
			var spareImg = spareImages[Math.floor(Math.random() * spareImages.length)];
			if (spareImg != undefined) {
				imageHash = figma.createImage(spareImg).hash;			
			}
		} else {
			var isAlreadyExist = (spareImageIdList.indexOf(imageId) >= 0)
			if (!isAlreadyExist) {
				spareImages.push(imgData)
				spareImageIdList.push(imageId)
				console.log("spare iamge is aadded.  lentgh: " + spareImages.length)	
			}	
		}

		if (imageHash.length == 0) { return }

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
}

