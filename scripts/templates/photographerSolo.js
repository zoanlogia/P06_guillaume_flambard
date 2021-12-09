export class PhotographerSolo {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerSolo() {
    console.log(this._photographer.info);
    console.log(this._photographer.medias);
    const sectionSolo = document.createElement("div");
    sectionSolo.classList.add("container-card");
    // const photographerSolo = `
    // <div class="container-card">
    // <article>
    //   <a href="photographer.html?id=${this._photographer.info.id}">
    //     <img class="photographer_img" src="assets/photographers/${this._photographer.info.portrait}" alt="${this._photographer.info.name}"/>
    //       <h2>${this._photographer.info.name}</h2>
    //   </a>
    //   <p class="photographer_city">${this._photographer.info.city}, ${this._photographer.info.country}</p>
    //   <a href="#">
    //     <p class="photographer_tagline">${this._photographer.info.tagline}</p>
    //   </a>
    //   <p class="photographer_price">${this._photographer.info.price}</p>
    // </article>
    // </div>`;

    // sectionSolo.innerHTML = photographerSolo;
    // return sectionSolo;
  }
}
