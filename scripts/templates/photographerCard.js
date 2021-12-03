export class PhotographersCard {
  constructor(photographers) {
    this._photographers = photographers;
  }

  createPhotographersCard() {
    const section = document.createElement("div");
    section.classList.add("container-card");
    const dateUnit = "jour";
    const moneyUnit = "€";
    const photographersCard = `
    <article>
      <a href="photographer.html?id=${this._photographers.id}">
        <img class="photographer_img" src="${this._photographers.portrait}" alt="${this._photographers.name}"/>
          <h2>${this._photographers.name}</h2>
      </a>
      <p class="photographer_city">${this._photographers.city}, ${this._photographers.country}</p>
      <a href="#">
        <p class="photographer_tagline">${this._photographers.tagline}</p>
      </a>
      <p class="photographer_price">${this._photographers.price}${moneyUnit}/${dateUnit}</p>
    </article>`;

    section.innerHTML = photographersCard;
    return section;
  }
}