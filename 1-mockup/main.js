class MockupElement extends HTMLElement {
    constructor() {
        super();
        console.log('MockupElement created!');
        this.shadow = this.attachShadow({ mode: 'open' });    // mode to parametr, który określa, czy nasz komponent udostępnia shadow root w wewnątrz, zawsze ustawiajmy sobie na open, przynajmniej w trybie debugowym
    }

    connectedCallback() {
        console.log('connectedCallback');
        let $template = document.querySelector('template').cloneNode(true);
        this.shadow.appendChild($template.content);
        this.shadow.querySelector('img').src = this.attributes.image.value;
    }
}
window.customElements.define('mockup-element', MockupElement);
