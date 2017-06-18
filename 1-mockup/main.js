class MockupElement extends HTMLElement {
    constructor() {
        super();
        console.log('MockupElement created!')
    }
}
window.customElements.define('mockup-element', MockupElement);
