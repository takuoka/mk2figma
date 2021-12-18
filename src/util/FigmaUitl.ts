
var imageCahce: ImageCache

const FigmaUtil = {
	
	setImage: function(target: SceneNode, imageData: Uint8Array, imageId: number) {
		if (imageCahce == undefined) { imageCahce = new ImageCache() }

		var imageHash: string = ""
		var isFailed = false

		try {
			imageHash = figma.createImage(imageData).hash;
		} catch (error) {
			console.log(error)
			isFailed = true			
		}

		if (isFailed) {
			if (!imageCahce.isEmpty()) {
				imageHash = figma.createImage(imageCahce.getRandom()).hash;			
			}
		} else {
			imageCahce.addImage(imageData, imageId)
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

