export class PhotographerSolo { 
  constructor(Photographers, id) {
    this._photographers = Photographers;
    this._photographersID = id;
  }

  createPhotographerSolo() {
    console.log(this._photographersID);
    const sectionSolo = document.createElement("div");
    sectionSolo.classList.add("container-card");
    const photographerSolo = `
    <article>
      <a href="photographer.html?id=${this._photographers.id}">
        <img class="photographer_img" src="${this._photographers.portrait}" alt="${this._photographers.name}"/>
          <h2>${this._photographers.name}</h2>
      </a>
      <p class="photographer_city">${this._photographers.city}, ${this._photographers.country}</p>
      <a href="#">
        <p class="photographer_tagline">${this._photographers.tagline}</p>
      </a>
      <p class="photographer_price">${this._photographers.price}</p>
    </article>`;

    sectionSolo.innerHTML = photographerSolo;
      return sectionSolo;
    }
}