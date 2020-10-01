const FigmaUtil = {
	setImage: function(target: SceneNode, imgData: Uint8Array) {

		var imageHash: string = ""

		// avoid error of image type
		try {
			imageHash = figma.createImage(imgData).hash;			
		} catch (error) {
			console.log(error)
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

