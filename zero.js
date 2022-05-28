/**
 * 使用零宽字符隐藏文本
 * @author gggxbbb
 */
class zero {
    /**
     * 使用零宽字符编码字符串
     * @author Github Copilot
     * @param str{string} 需要编码的字符串
     * @returns {string}
     */
    static encode(str) {
        const arr = Array.from(str);
        const bin = arr.map(x => x.charCodeAt(0).toString(2));
        return bin.map(c => Array.from(c).map(b => b === '1' ? '‍' : '‌').join('')).join('​');
    }

    /**
     * 解码使用零宽字符编码的字符串
     * @author Github Copilot
     * @param str{string} 需要解码的字符串
     * @returns {string}
     */
    static decode(str) {
        const arr = str.split('​');
        const bin = arr.map(x => x.split('').map(y => y === '‍' ? '1' : '0').join(''));
        return bin.map(c => String.fromCharCode(parseInt(c, 2))).join('');
    }

    /**
     * 从字符串中提取隐藏字符串
     * @param str{string} 待提取的字符串
     * @returns {extractedData} 提取的隐藏字符串和可见原字符串
     */
    static extract(str) {
        const arr = Array.from(str);
        let opt = "";
        let r = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "‌" || arr[i] === "‍" || arr[i] === "​") {
                opt += arr[i];
            } else {
                r += arr[i];
            }
        }
        return extractedData(r, this.decode(opt));
    }

    /**
     * 向字符串中嵌入待隐藏的字符串
     * @param str 可见字符串
     * @param ipt 待嵌入的字符串
     * @returns {string} 嵌入后的字符串
     */
    static embed(str, ipt) {
        const tr = this.encode(ipt);
        const k = Math.ceil(tr.length / (str.length - 1));
        let r = "";
        for (let i = 0; i < str.length; i++) {
            r += str[i];
            if (i * k < tr.length) {
                r += tr.slice(i * k, (i + 1) * k);
            }
        }
        return r;
    }

}

/**
 * 提取的隐藏字符串和可见原字符串
 */
class extractedData {
    visibleStr
    hiddenStr

    /**
     * 构造提取数据
     * @param visibleStr{string} 可见字符串
     * @param hiddenStr{string} 隐藏字符串
     */
    constructor(visibleStr, hiddenStr) {
        this.visibleStr = visibleStr;
        this.hiddenStr = hiddenStr;
    }

    /**
     * 获取可见字符串
     * @returns {string} 可见字符串
     */
    get visibleStr() {
        return this.visibleStr;
    }

    /**
     * 获取隐藏字符串
     * @returns {string} 隐藏字符串
     */
    get hiddenStr() {
        return this.hiddenStr;
    }
}