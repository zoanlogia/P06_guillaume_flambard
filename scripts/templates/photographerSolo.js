export class PhotographerSolo {
  constructor(photographer) {
    this._photographer.info = photographer;
    this._photographer.media = photographer;
  }

  createPhotographerSolo() {
    const sectionSolo = document.createElement("div");
    sectionSolo.classList.add("container-card");
    const photographerSolo = `
    <article>
      <a href="photographer.html?id=${this._photographer.info.id}">
        <img class="photographer_img" src="${this._photographer.portrait}" alt="${this._photographer.name}"/>
          <h2>${this._photographer.name}</h2>
      </a>
      <p class="photographer_city">${this._photographer.city}, ${this._photographer.country}</p>
      <a href="#">
        <p class="photographer_tagline">${this._photographer.tagline}</p>
      </a>
      <p class="photographer_price">${this._photographer.price}</p>
    </article>`;

    sectionSolo.innerHTML = photographerSolo;
      return sectionSolo;
    }
}