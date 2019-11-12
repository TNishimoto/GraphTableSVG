// tslint:disable-next-line: no-namespace
namespace GraphTableSVG {
    /**
     * 色に関する名前空間です。
     */
    export namespace Color {
        const colorNameArray: string[] = new Array("aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
            "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue",
            "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue",
            "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
            "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray",
            "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
            "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray",
            "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
            "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
            "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen",
            "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen",
            "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
            "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
            "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab",
            "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
            "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown",
            "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver",
            "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle",
            "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen");
        let colorDic: { [key: string]: number; };

        // redの16進数の配列
        const rValue: string[] = new Array("F0", "FA", "00", "7F", "F0", "F5", "FF", "00", "FF", "00", "8A", "A5", "DE", "5F", "7F", "D2",
            "FF", "64", "FF", "DC", "00", "00", "00", "B8", "A9", "00", "BD", "8B", "55", "FF", "99", "8B", "E9", "8F", "48", "2F",
            "00", "94", "FF", "00", "69", "1E", "B2", "FF", "22", "FF", "DC", "F8", "FF", "DA", "80", "00", "AD", "F0", "FF", "CD",
            "4B", "FF", "F0", "E6", "FF", "7C", "FF", "AD", "F0", "E0", "FA", "90", "D3", "FF", "FF", "20", "87", "77", "B0", "FF",
            "00", "32", "FA", "FF", "80", "66", "00", "BA", "93", "3C", "7B", "00", "48", "C7", "19", "F5", "FF", "FF", "FF", "00",
            "FD", "80", "6B", "FF", "FF", "DA", "EE", "98", "AF", "DB", "FF", "FF", "CD", "FF", "DD", "B0", "80", "FF", "BC", "41",
            "8B", "FA", "F4", "2E", "FF", "A0", "C0", "87", "6A", "70", "FF", "00", "46", "D2", "00", "D8", "FF", "40", "EE", "F5",
            "FF", "F5", "FF", "9A");

        // greenの16進数の配列
        const gValue: string[] = new Array("F8", "EB", "FF", "FF", "FF", "F5", "E4", "00", "EB", "00", "2B", "2A", "B8", "9E", "FF", "69",
            "7F", "95", "F8", "14", "FF", "00", "8B", "86", "A9", "64", "B7", "00", "6B", "8C", "32", "00", "96", "BC", "3D", "4F",
            "CE", "00", "14", "BF", "69", "90", "22", "FA", "8B", "00", "DC", "F8", "D7", "A5", "80", "80", "FF", "FF", "69", "5C",
            "00", "FF", "E6", "E6", "F0", "FC", "FA", "D8", "80", "FF", "FA", "EE", "D3", "B6", "A0", "B2", "CE", "88", "C4", "FF",
            "FF", "CD", "F0", "00", "00", "CD", "00", "55", "70", "B3", "68", "FA", "D1", "15", "19", "FF", "E4", "E4", "DE", "00",
            "F5", "80", "8E", "A5", "45", "70", "E8", "FB", "EE", "70", "EF", "DA", "85", "C0", "A0", "E0", "00", "00", "8F", "69",
            "45", "80", "A4", "8B", "F5", "52", "C0", "CE", "5A", "80", "FA", "FF", "82", "B4", "80", "BF", "63", "E0", "82", "DE",
            "FF", "F5", "FF", "CD");

        // blueの16進数の配列
        const bValue: string[] = new Array("FF", "D7", "FF", "D4", "FF", "DC", "C4", "00", "CD", "FF", "E2", "2A", "87", "A0", "00", "1E",
            "50", "ED", "DC", "3C", "FF", "8B", "8B", "0B", "A9", "00", "6B", "8B", "2F", "00", "CC", "00", "7A", "8F", "8B", "4F",
            "D1", "D3", "93", "FF", "69", "FF", "22", "F0", "22", "FF", "DC", "FF", "00", "20", "80", "00", "2F", "F0", "B4", "5C",
            "82", "F0", "8C", "FA", "F5", "00", "CD", "E6", "80", "FF", "D2", "90", "D3", "C1", "7A", "AA", "FA", "99", "DE", "E0",
            "00", "32", "E6", "FF", "00", "AA", "CD", "D3", "DB", "71", "EE", "9A", "CC", "85", "70", "FA", "E1", "B5", "AD", "80",
            "E6", "00", "23", "00", "00", "D6", "AA", "98", "EE", "93", "D5", "B9", "3F", "CB", "DD", "E6", "80", "00", "8F", "E1",
            "13", "72", "60", "57", "EE", "2D", "C0", "EB", "CD", "90", "FA", "7F", "B4", "8C", "80", "D8", "47", "D0", "EE", "B3",
            "FF", "F5", "00", "32");

        /**
         * 色名から16進コードを生成します。
         * @param colorName
         */
        export function createHexCodeFromColorName(colorName: string): string {
            if (!colorDic) {
                colorDic = {};
                for (let i = 0; i < colorNameArray.length; i++) {
                    colorDic[colorNameArray[i]] = i;
                }
            }

            if (colorName in colorDic) {
                const i = colorDic[colorName];
                return rValue[i] + gValue[i] + bValue[i];

            } else {
                return colorName;
            }
        }
        /**
         * 色名を16進表現に変換します。
         * @param colorName
         */
        export function createHexFromColorName(colorName: string): { r: number, g: number, b: number } | null {
            if (!colorDic) {
                colorDic = {};
                for (let i = 0; i < colorNameArray.length; i++) {
                    colorDic[colorNameArray[i]] = i;
                }
            }

            if (colorName in colorDic) {
                const i = colorDic[colorName];
                // return r_value[i] + g_value[i] + b_value[i];
                return { r: parseInt(rValue[i], 16), g: parseInt(gValue[i], 16), b: parseInt(bValue[i], 16) };
            } else {
                return null;
            }
        }

        /**
         * 色名をRGBコードに変換します。
         * @param colorName
         */
        export function createRGBCodeFromColorName(colorName: string): string {
            colorName = createHexCodeFromColorName(colorName);
            if (colorName.substr(0, 3) === "rgb") {
                return colorName;
            } else {
                if (colorNameArray.length === 6) {
                    const r = colorName.substr(0, 2);
                    const g = colorName.substr(2, 2);
                    const b = colorName.substr(4, 2);
                    return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
                } else {
                    return `rgb(${80}, ${80}, ${80})`;
                }
            }
        }
        /**
         * 色名をRGB表現に変換します。
         * @param str
         */
        export function createRGBFromColorName(str: string): { r: number, g: number, b: number } {
            const v = createHexFromColorName(str);
            const def = { r: 80, g: 80, b : 80 };
            if (v != null) {
                return v;
            } else {
                if (str.substr(0, 3) === "rgb") {
                    str = str.replace("rgb(", "");
                    str = str.replace(")", "");
                    const values = str.split(",");
                    if (values.length === 3) {
                        return { b: parseInt(values[2], undefined), g: parseInt(values[1], undefined),
                            r: parseInt(values[0], undefined) } ;
                    } else {
                        return def;
                    }
                } else if (str.length === 6) {
                    const r = str.substr(0, 2);
                    const g = str.substr(2, 2);
                    const b = str.substr(4, 2);
                    return { g: parseInt(g, undefined), b: parseInt(b, undefined), r: parseInt(r, undefined) };

                } else {
                    return def;
                }
            }
        }

    }
}
