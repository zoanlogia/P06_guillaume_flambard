export class PhotographerSolo {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createHeader() {
    const div = document.createElement('div')
    const content = `
    <ul class="a11y-nav">
      <li><a href="#main">Passer directement au contenu</a></li>
    </ul>
      <header class="photographer-header">
        <a href="index.html">
          <img src="assets/images/logo.png" class="logo" alt="logo" />
        </a>
      </header>
      <main id="main">
        <section class="presentation">
          <div>
            <h1>${this._photographer.info.name}</h1>
            <h2>${this._photographer.info.city}, ${this._photographer.info.country}</h2>
            <p>${this._photographer.info.tagline}</p>
          </div>
          <button class="contact_button">Contactez-moi</button>
          <img src="assets/photographers/${this._photographer.info.portrait}" alt="${this._photographer.info.name}" />  
        </section>
      </main>
    `;
    div.innerHTML = content
    return div
  }

  // createPhotographerSolo() {
  //   const sectionSolo = document.createElement("div");
  //   sectionSolo.classList.add("container-card");
  //   const photographerSolo = `
  //   <div class="container-card">
  //   <article>
  //     <a href="photographer.html?id=${this._photographer.info.id}">
  //       <img class="photographer_img" src="assets/photographers/${this._photographer.info.portrait}" alt="${this._photographer.info.name}" width='350' height="300"/>
  //         <h2>${this._photographer.info.name}</h2>
  //     </a>
  //     <p class="photographer_city">${this._photographer.info.city}, ${this._photographer.info.country}</p>
  //     <a href="#">
  //       <p class="photographer_tagline">${this._photographer.info.tagline}</p>
  //     </a>
  //     <p class="photographer_price">${this._photographer.info.price}</p>
  //   </article>
  //   </div>`;

  //   sectionSolo.innerHTML = photographerSolo;
  //   return sectionSolo;
  // }

  createGallery() {
    const div = document.createElement('div')

    const firstname = this._photographer.info.name.split(' ')


    let medias = ''
    this._photographer.medias.forEach(data => {
      if (data.image) {
        medias += `
        <a href="../assets/${firstname[0]}/${data.image}">
          <img src="../assets/${firstname[0]}/${data.image}" alt="image">
          <div class="gallery__img__desc">
            <p>${data.title}</p>
            <span>${data.likes}</span>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </a>`
      }
      else {
        medias += `
        <a href="../assets/${firstname[0]}/${data.video}">
          <video controls height="300" width="350">
          <source src="../assets/${firstname[0]}/${data.video}" type="video/mp4">
          </video>
          <div class="gallery__img__desc">
            <span>${data.likes}</span>
            <i class="fa-regular fa-heart"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </a>`;
      }
    });

    div.innerHTML = `<section class="gallery">
          <div class="gallery__menu">
            <p>Trier par</p>
            <ul class="gallery__menu__list">
              <li>
                <a href="#"
                  >Popularité &nbsp; <i class="fa fa-angle-up"></i
                  ><i class="fa fa-angle-down"></i
                ></a>
                <ul>
                  <li><a class="btn-border" href="#">Date</a></li>
                  <li><a href="#">Titre</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="gallery__img">
          ${medias}
          </div>`;
    return div
  }
}
