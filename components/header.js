class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header><h1>Notes App - Gilang Athaya</h1></header>`;
    }
}
customElements.define("custom-header", CustomHeader);
