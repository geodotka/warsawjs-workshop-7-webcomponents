class GithubProfileCardElement extends HTMLElement {
    constructor() {
        super();
        console.log('GithubProfileCardElement: constructor');
        this.shadow = this.attachShadow({ mode: 'open' });    // mode to parametr, który określa, czy nasz komponent udostępnia shadow root w wewnątrz, zawsze ustawiajmy sobie na open, przynajmniej w trybie debugowym
    }

    connectedCallback() {
        console.log('GithubProfileCardElement: connectedCallback');
        let $template = GithubProfileCardElement.DOCUMENT.querySelector('template').cloneNode(true);
        this.shadow.appendChild($template.content);
        let login = this.attributes.login.value;
        Promise.resolve(login)
            .then(this._fetchProfileDetails.bind(this))
            .then(this._fetchProfileDRepositories.bind(this))
    }

    _fetchProfileDetails(login) {
        let url = `../mocks/github-${login}-profile.json`;
//        let url = 'https://api.github.com/users/' + login;
        return fetch(url, { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((profile) => {
                this._displayAvatar(profile.avatar_url);
                this._displayUsername(profile.login);
                this._displayBio(profile.bio);
                this._displayLocation(profile.location);
            })
    }

    _displayAvatar(avatarUrl) {
        this.shadow.querySelector('img').src = avatarUrl;
    }

    _displayUsername(username) {
        this.shadow.querySelector('h1').innerHTML = username;
    }

    _displayBio(bio) {
        this.shadow.querySelector('.bio').innerHTML = bio;
    }

    _displayLocation(location) {
        this.shadow.querySelector('.location').innerHTML = location;
    }

    _fetchProfileDRepositories(profile) {
        let url = '../mocks/github-piecioshka-repositories.json';
//        let url = profile.repos_url;
        return fetch(url, { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((reposList) => {
                this._displayRepos(reposList);
            })
    }

    _displayRepos(reposList) {
        let $ul =  this.shadow.querySelector('ul');
        for (let repo of this._sortReposList(reposList)) {
            let $li = document.createElement('li');
            $li.innerHTML = `<span>${repo.stargazers_count} stars  - ${repo.name}</span>`;
            $ul.appendChild($li)
        }
    }

    _sortReposList(reposList) {
        reposList.sort(this._compareNumbers);
        return reposList.splice(0, 6)
    }

    _compareNumbers(repo1, repo2) {
        return repo2.stargazers_count - repo1.stargazers_count
    }
}

GithubProfileCardElement.DOCUMENT = document.currentScript.ownerDocument;

window.customElements.define('github-profile-card-element', GithubProfileCardElement);
