class zero {
    static encode(str) {
        const arr = Array.from(str);
        const bin = arr.map(x => x.charCodeAt(0).toString(2));
        return bin.map(c => Array.from(c).map(b => b === '1' ? '‍' : '‌').join('')).join('​');

    }

    static decode(str) {
        const arr = str.split('​');
        const bin = arr.map(x => x.split('').map(y => y === '‍' ? '1' : '0').join(''));
        return bin.map(c => String.fromCharCode(parseInt(c, 2))).join('');
    }

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
        return [this.decode(opt), r];
    }

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