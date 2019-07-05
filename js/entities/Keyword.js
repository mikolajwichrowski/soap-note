export class Keyword {
    constructor(word) {
        this.word=word;
    }

    display() {
        return `<span class="hot-text">${ this.word }</span>`;
    }
}