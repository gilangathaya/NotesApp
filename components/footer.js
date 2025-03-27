class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<footer><p>Gilang Athaya © 2025 Notes App</p></footer>`;
    }
}
customElements.define("custom-footer", CustomFooter);
