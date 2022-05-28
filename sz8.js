class sz8 {
    static depth = 3;
    static charPools = ["常", "熟", "市", "中", "学", "我", "爱", "你"];

    static strToBinary(str) {
        const result = [];
        const list = str.split("");
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const binaryStr = item.charCodeAt(0).toString(2);
            if (binaryStr.length < 16) {
                result.push("0".repeat(16 - binaryStr.length));
            }
            result.push(binaryStr);
        }
        return result.join("");
    }

    static binaryAgent(str) {
        const arr = str.split(' ');
        return arr.map(item => {
            let asciiCode = parseInt(item, 2);
            return String.fromCharCode(asciiCode)
        }).join('');
    }

    static encode(s) {
        let bin = this.strToBinary(s);
        let extraChar = this.depth - bin.length % this.depth;
        if (extraChar === this.depth) {
            extraChar = 0;
        }
        bin += "0".repeat(extraChar);
        const arr = bin.split("");
        let result = "";
        for (let i = 0; i < arr.length; i += this.depth) {
            let item = "";
            for (let j = 0; j < this.depth; j++) {
                item += arr[i + j];
            }
            const index = parseInt(item, 2);
            result += this.charPools[index];
        }
        result += "=".repeat(extraChar);
        return result;
    }

    static decode(s) {
        let bin = "";
        const arr = s.split("");
        let extraChar = arr.length - arr.indexOf("=");
        if (extraChar >= arr.length) {
            extraChar = 0;
        }
        for (let i = 0; i < arr.length - extraChar; i++) {
            const item = arr[i];
            const index = this.charPools.indexOf(item);
            const b = index.toString(2);
            if (b.length < this.depth) {
                bin += "0".repeat(this.depth - b.length);
            }
            bin += b;
        }
        const arrBin = bin.split("");
        let tempBin = "";
        for (let i = 0; i < arrBin.length - extraChar; i += 16) {
            tempBin += arrBin.slice(i, i + 16).join("");
            if (i + 16 < arrBin.length - extraChar) {
                tempBin += " ";
            }
        }
        return this.binaryAgent(tempBin);
    }
}