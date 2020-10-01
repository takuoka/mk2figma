const FigmaUtil = {
	setImage: function(target: SceneNode, imgData: Uint8Array) {
		const imageHash = figma.createImage(imgData).hash;
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

