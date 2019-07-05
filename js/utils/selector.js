const init = () => {
    HTMLElement.prototype.evnt = function(type, event) {
        this.addEventListener(type, event);
        return this;
    }

    NoHtmlObject.prototype.evnt = function(event) {
        console.error("Can not add event to null object!");
        return null;
    }

    HTMLElement.prototype.show = function() {
        this.classList.remove("hidden");
        return this;
    }

    NodeList.prototype.before = function(method) {
        method();
        return this;
    }

    HTMLElement.prototype.hide = function() {
        this.classList.add("hidden");
        return this;
    }

    HTMLElement.prototype.empty_outline = function() {
        this.classList.add("button-outline");
        return this;
    }

    HTMLElement.prototype.filled_outline = function() {
        this.classList.remove("button-outline");
        return this;
    }
}

const slkt = (element) => {
    const el = document.querySelectorAll(element)[0];
    return el != null ? el : new NoHtmlObject(el);
}

const slktl = (element) => {
    const el = document.querySelectorAll(element);
    return el != null ? el : new NodeList(1).map(e => new NoHtmlObject(el));
}

export { init, slkt, slktl }
export class NoHtmlObject {
    constructor(el) {
        console.warn("Element " + el + " not found");
    }
}
