/** @format */

export class PhotographerSolo {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createHeader() {
    const div = document.createElement("div");
    const content = `
      <header class="photographer-header">
        <a href="index.html">
          <img src="assets/images/logo.png" class="logo" alt="logo" />
        </a>
      </header>
      <section class="presentation">
        <div>
          <h1>${this._photographer.info.name}</h1>
          <h2>
            ${this._photographer.info.city}, ${this._photographer.info.country}
          </h2>
          <p>${this._photographer.info.tagline}</p>
        </div>
        <button id="myBtn" class="contact_button">Contactez-moi</button>
        <img
          src="assets/photographers/${this._photographer.info.portrait}"
          alt="${this._photographer.info.name}"
        />
      </section>
    `;
    div.innerHTML = content;
    return div;
  }
  
  createFilter() {
    const div = document.createElement("div");
    div.classList.add("dropdown-container");
    const content = `
     <p>Trier par</p>
        <div class="dropdown">
          <button id="dropBtn" class="dropbtn">Popularité <i class="fas fa-angle-down"></i></button>
          <ul id="myDropdown" class="dropdown-content option">
            <li class="option">Date</li>
            <li class="option">Titre</li>
          </ul>
        </div>
    `;
    div.innerHTML = content;
    return div;
  }

  createGallery(mediaToShow) {

    const firstname = this._photographer.info.name.split(" ");

    const isGalleryAlreadyHere = document.querySelector(".gallery");

    let div

    if (isGalleryAlreadyHere) {
      div = isGalleryAlreadyHere;
    } else {
      div = document.createElement("div");
      div.classList.add("gallery");
    }

    const medias = mediaToShow ? mediaToShow : this._photographer.medias;

    console.log(medias);
    
    medias.forEach((data) => {
      let dom = "";
      if (data.image) {
        dom += `
        <div class="medias-container">
          <a href="../assets/${firstname[0]}/${data.image}">
            <img src="../assets/${firstname[0]}/${data.image}" alt="image">
          </a>
          <div class="desc">
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
        dom += `
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
      div.innerHTML = dom
    });
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
          <form id="form1">
            <label for="name">Prénom</label>
            <input type="text" id="name" name="name" />
            <p class="error">Veuillez renseigner un prénom valide</p>
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname"/>
            <p class="error">Veuillez renseigner un nom valide</p>
            <label for="mail">Email</label>
            <input type="mail" id="mail" name="name" />
            <p class="error">Veuillez renseigner un email valide </p>
            <label for="message">Votre message</label>
            <textarea type="textarea" id="message" name="message"></textarea>
            <div class="confirmation">Votre demande a bien été envoyée !</div>
            <button form="form1" type="submit">Envoyer</button>
            </form>
        </div>
      </div>
    `;
    return html;
  }
}
