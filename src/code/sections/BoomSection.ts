class BoomSection {

    start() {

    }

    getBoomSection(firstViewChildren: readonly SceneNode[]): FrameNode {
		for (const node of firstViewChildren) {
			if (node.name.includes("@BoomSection")) {
				return node as FrameNode
			}
		}
		return null
    }

    fetchData() {

    }

    applyData() {

    }
}