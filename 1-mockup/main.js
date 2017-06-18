class GeodotkaComponent extends HTMLElement {
    constructor() {
        super();
        console.log('Geodotka created!')
    }
}
window.customElements.define('geodotka-component', GeodotkaComponent);
