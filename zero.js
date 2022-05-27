function encode(str) {
    const arr = Array.from(str);
    const bin = arr.map(x => x.charCodeAt(0).toString(2));
    return bin.map(c => Array.from(c).map(b => b === '1' ? '‍' : '‌').join('')).join('​');

}

function decode(str) {
    const arr = str.split('​');
    const bin = arr.map(x => x.split('').map(y => y === '‍' ? '1' : '0').join(''));
    return bin.map(c => String.fromCharCode(parseInt(c, 2))).join('');
}

function extract(str) {
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
    return [decode(opt), r];
}

function embed(str, ipt) {
    const tr = encode(ipt);
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