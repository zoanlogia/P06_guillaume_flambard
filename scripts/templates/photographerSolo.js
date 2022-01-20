/** @format */

export class PhotographerSolo {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createHeader() {
    const div = document.createElement("div");
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
          <button id="myBtn" class="contact_button">Contactez-moi</button>
          <img src="assets/photographers/${this._photographer.info.portrait}" alt="${this._photographer.info.name}" />  
        </section>
      </main>
    `;
    div.innerHTML = content;
    return div;
  }

  createGallery() {
    const div = document.createElement("div");

    const firstname = this._photographer.info.name.split(" ");

    let medias = "";
    this._photographer.medias.forEach((data) => {
      if (data.image) {
        medias += `
        <div class="medias-container">
          <a href="../assets/${firstname[0]}/${data.image}">
            <img src="../assets/${firstname[0]}/${data.image}" alt="image">
          </a>
          <div class="gallery__img__desc">
            <div>
            <p>${data.title}</p>
            </div>
            <div class="heart-container">
              <span>${data.likes}</span>
              <span class="icon-full"><i class="icon-full fas fa-heart"></i></span>
              <span class="icon-empty"><i class="far fa-heart fa-1x"></i></span>
            </div>
          </div>
        </div>
        `;
      } else {
        medias += `
        <div class="medias-container">
          <a href="../assets/${firstname[0]}/${data.video}">
            <video controls class="video">
              <source src="../assets/${firstname[0]}/${data.video}" type="video/mp4">
            </video>
          </a>
          <div class="gallery__img__desc">
            <div class="heart-container">
              <span>${data.likes}</span>
              <span class="icon-full"><i class="icon-full fas fa-heart"></i></span>
              <span class="icon-empty"><i class="far fa-heart fa-1x"></i></span>
            </div>
          </div>
        </div>
        `;
      }
    });

    div.innerHTML = `
    <section class="gallery">
      <div class="gallery__menu">
        <p>Trier par</p>
        <ul class="gallery__menu__list">
          <li>
            <a href="#"
              >Popularité &nbsp; <i class="fa fa-angle-up"></i
              ><i class="fa fa-angle-down"></i>
            </a>
            <ul>
              <li><a class="btn-border" href="#">Date</a></li>
              <li><a href="#">Titre</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="gallery__img">
      ${medias}
      </div>
    </section>`;
    return div;
  }

  createCounter() {
    const span = document.querySelectorAll(
      ".heart-container > span:nth-child(1)",
    );
    let ttx = 0;

    span.forEach((like) => {
      ttx += parseInt(like.innerHTML);
    });

    const html = document.createElement("div");
    html.innerHTML = ` 
    <div class="counter">
      <div>
        <span class="ttx">${ttx}</span>
        <i class="fas fa-heart"></i>
      </div>
      <span>${this._photographer.info.price} / jour</span>
    </div>`;
    return html;
  }

  createModal() {
    const html = document.createElement("div");
    html.innerHTML = `
      <div class="modal" id="myModal">
        <div class="modal-content">
          <div class="title">
            <h2>Contactez-moi</h2>
            <span class="close">&times;</span>
          </div>
          <h2>${this._photographer.info.name}</h2>
          <form>
            <label for="name">Prénom</label>
            <input type="text" id="name" />
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" />
            <label for="mail">Email</label>
            <input type="mail" id="mail" />
            <label for="message">Votre message</label>
            <textarea type="textarea" id="message"></textarea>
            </form>
            <button type="submit">Envoyer</button>
        </div>
      </div>
    `;
    return html;
  }
}
