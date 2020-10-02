class RGB {
    r01: number
    g01: number
    b01: number

    constructor(hex: string) {
        var rgb = this.hexToRgb(hex)
        this.r01 = rgb.r / 255
        this.g01 = rgb.g / 255
        this.b01 = rgb.b / 255
    }

    private hexToRgb(hex: string) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
		} : null;
    }
}