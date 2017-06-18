class MediaProjectorElement extends HTMLElement {
    constructor() {
        super();
        console.log('MediaProjectorElement created!');
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        console.log('connectedCallback');
        this._renderTemplate();
        console.log(this);
        console.log(this.children);
        this.addEventListener('click', this._onClickHandler);
    }

    disconnectCallback() {
        this.removeEventListener('click', this._onClickHandler);
    }

    _renderTemplate() {
        let $template = MediaProjectorElement.DOCUMENT.querySelector('template').cloneNode(true);
        this.shadow.appendChild($template.content);
    }

    _onClickHandler() {
        console.log('AAAAAAAAAAAAAAAAA');
        if (this.slider) {
            return;
        }

        this.slider = new Slider({
             items: this.children,
             callback: ($element) => {
                 this._displayMedia($element.cloneNode(true));
             }
         });
    }

    _displayMedia($element) {
        let $screen = this.shadow.querySelector('.projector');
        $screen.innerText = '';
        $screen.appendChild($element);
    }
}

MediaProjectorElement.DOCUMENT = document.currentScript.ownerDocument;

window.customElements.define('media-projector-element', MediaProjectorElement);
