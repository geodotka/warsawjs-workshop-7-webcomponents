class MockupElement extends HTMLElement {
    constructor() {
        super();
        console.log('MockupElement created!');
        this.shadow = this.attachShadow({ mode: 'open' });    // mode to parametr, który określa, czy nasz komponent udostępnia shadow root w wewnątrz, zawsze ustawiajmy sobie na open, przynajmniej w trybie debugowym
        console.log(this.shadow);
        this.shadow.innerHTML = document.querySelector('template').innerHTML;
    }
}
window.customElements.define('mockup-element', MockupElement);
