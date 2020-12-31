import { tree } from './tree.js'

export const roman = input => {
    const str = input.replace(/[Ａ-Ｚａ-ｚ]/, s => String.fromCharCode(s.charCodeAt(0) - 65248)); // 全角→半角→小文字
    let result = '';
    let tmp = '';
    let index = 0;
    const len = str.length;
    let node = tree;
    const push = (char, toRoot = true) => {
        result += char;
        tmp = '';
        node = toRoot ? tree : node;
    };
    while (index < len) {
        const char = str.charAt(index);
        if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
            if (char in node) {
                const next = node[char];
                if (typeof next === 'string') {
                    push(next);
                } else {
                    tmp += input.charAt(index);
                    node = next;
                }
                index++;
                continue;
            }
            const prev = str.charAt(index - 1);
            if (prev && (prev === 'n' || prev === char)) { // 促音やnへの対応
                push(prev === 'n' ? 'ン' : 'ッ', false);
            }
            if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
                push(tmp);
                continue;
            }
        }
        push(tmp + char);
        index++;
    }
    tmp = tmp.replace(/n$/, 'ン'); // 末尾のnは変換する
    push(tmp);
    return result;
}