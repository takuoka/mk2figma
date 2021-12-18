export const FontLoader = {

    loadFonts: async function() {
        return Promise.all([
            figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W3" }),
            figma.loadFontAsync({ family: "Hiragino Kaku Gothic ProN", style: "W6" }),
            figma.loadFontAsync({ family: "Hiragino Sans", style: "W3" }),
            figma.loadFontAsync({ family: "Hiragino Sans", style: "W6" })
        ])
    }
}
