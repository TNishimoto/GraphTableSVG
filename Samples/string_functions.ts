
module StringModule{
    function bunrui(strings: string[]): { [key: number]: string[]; } {
        var p: { [key: number]: string[]; } = {};
        for (var i = 0; i < strings.length; i++) {
            var str1 = strings[i];
            var c = str1.charCodeAt(0);
            if (p[c] == null) p[c] = new Array(0);

            p[c].push(str1.substring(1));
        }
        return p;
    }
    function getChars(str: string): string[] {
        var p: { [key: number]: string; } = {};

        var r = new Array(0);
        var count = 0;
        for (var i = 0; i < str.length; i++) {
            if (p[str.charAt(i)] == null) {
                p[str.charCodeAt(i)] = str.charAt(i);
                count++;
            } else {
            }
        }

        for (var c in p) {
            var ch: number = +c;
            r.push(String.fromCharCode(ch));
        }
        return r;
    }

    export function computeSuffixArray(str: string): number[] {
        var arr: number[] = new Array(str.length);
        for (var i = 0; i < str.length; i++) {
            arr[i] = i;
        }

        var func = function (item1: number, item2: number): number {
            for (var i = 0; i <= str.length; i++) {
                if (item1 + i >= str.length || item2 + i >= str.length) break;
                if (str.charAt(item1 + i) < str.charAt(item2 + i)) {
                    return - 1;
                } else if (str.charAt(item1 + i) > str.charAt(item2 + i)) {
                    return 1;
                }
            }
            if (item1 == item2) {
                return 0;
            } else {
                return item1 < item2 ? 1 : -1;
            }
        };
        arr.sort(func);
        return arr;
    }
    function getSortedSuffixes(str: string): string[] {
        var arr = computeSuffixArray(str);
        var r: string[] = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            r[i] = str.substring(arr[i]);
        }
        return r;
    }
    function computeLCP(str1: string, str2: string): number {
        var min = str1.length < str2.length ? str1.length : str2.length;
        var lcp = 0;
        for (var i = 0; i < min; i++) {
            if (str1.charAt[i] == str2.charAt[i]) {
                lcp++;
            } else {
                break;
            }
        }
        return lcp;
    }
    function computeLCPArray(str: string, sufarr: number[]): number[] {
        var lcparr = new Array(sufarr.length);
        for (var i = 0; i < sufarr.length; i++) {
            if (i == 0 && sufarr.length > 1) {
                lcparr[i] = -1;
            } else {
                lcparr[i] = computeLCP(str.substring(sufarr[i]), str.substring(sufarr[i - 1]));
            }
        }
        return lcparr;
    }
    export function createAllSuffixes(str: string): string[] {
        var str2 = "";
        for (var i= 0; i < str.length;i++){
            if (str[i] != "\n") {
                str2 += str[i];
            }
        }
        var suffixes = new Array(str2.length);
        for (var i = 0; i < suffixes.length; i++) {
            suffixes[i] = str2.substring(i);
        }
        return suffixes;
    }
    export function createAllTruncatedSuffixes(str: string, truncatedLength: number): string[] {
        var suffixes = new Array(str.length);
        for (var i = 0; i < suffixes.length; i++) {
            suffixes[i] = str.substr(i, truncatedLength);
        }
        return suffixes;
    }

    export function removeSpace(str: string): string {
        var r = "";
        var emptyCode = " ".charCodeAt(0);
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) != emptyCode) {
                r += str.charAt(i);
            }
        }
        return r;
    }
    function removeFirstSpaces(str: string): string {
        var i = 0;
        for (i = 0; i < str.length; i++) {
            if (str[i] != " ") break;
        }
        if (i == str.length) {
            return "";
        } else {
            return str.substring(i);
        }
    }
    export function reverse(str: string): string {
        var rv: string[] = [];
        for (var i = 0, n = str.length; i < n; i++) {
            rv[i] = str.charAt(n - i - 1);
        }
        return rv.join("");
    }

    export function LZ77WithSelfReference(str: string): ([number, number] | string)[] {
        var r = new Array(0);
        var startPos = 0;
        var lastRefPos = -1;
        var i = 0;
        while (i < str.length) {
            var substr = str.substr(startPos, i - startPos + 1);
            var reference = i == 0 ? "" : str.substring(0, i - 1);
            var refPos = reference.indexOf(substr);

            if (refPos == -1) {
                if (lastRefPos == -1) {
                    r.push(substr);
                    i++;
                } else {
                    r.push([lastRefPos, i - startPos]);
                }
                startPos = i;
                lastRefPos = -1;
            } else {
                lastRefPos = refPos;
                i++;
            }
        }
        if (lastRefPos != -1) {
            r.push([lastRefPos, str.length - startPos]);
        }
        return r;
    }
}
