/** @format */

/**
 * @property {HTMLElement} element
 * @property {string[]} images chemin des images la lightbox
 * @property {string} url
 */
export class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(
        'a[href$=".jpg"], a[href$=".png"], a[href$=".jpeg"], a[href$=".mp4"]',
      ),
    );

    const gallery = links.map((link) => link.getAttribute("href"));
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"), gallery);
      }),
    );
  }
  /**
   *
   * @param {string} url URL de l'image
   * @param {string[]} images chemin des images la lightbox
   */
  constructor(url, images) {
    this.element = this.buildDOM(url);
    this.images = images;
    this.loadMedia(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    // disableBodyScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *
   * @param {string} url URL de l'image
   */

  loadMedia(url) {
    this.url = null;
    const regex = /\.([a-zA-Z0-9]+)$/;
    const fileExt = url.match(regex)[1];

    const container = this.element.querySelector(".lightbox__container");
    const loader = document.createElement("div");

    if (fileExt == "mp4") {
      const video = document.createElement("video");
      video.src = url
      video.controls = true

      loader.classList.add('lighbox__loader')
      container.innerHTML = ''
      container.appendChild(video)
      this.url = url
    } else {
      let image = new Image();
      loader.classList.add("lightbox__loader");
      container.innerHTML = "";
      container.appendChild(loader);
      image.onload = () => {
        container.removeChild(loader);
        container.appendChild(image);
        this.url = url;
      };
      image.src = url;
    }
  }

  /**
   * @param {KeyboardEvent} e
   */

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  /**
   * Ferme la lightbox
   * @param {MouseEvent[keyboardEvent]} e
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    // enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }
  /**
   *
   * @param {MouseEvent[keyboardEvent]} e
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadMedia(this.images[i + 1]);
  }
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadMedia(this.images[i - 1]);
  }
  /**
   *
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<div class="lightbox">
                        <button class="lightbox__close"><i class="fas fa-times fa-4x"></i></button>
                        <button class="lightbox__next"><i class="fas fa-angle-right fa-4x"></i></button>
                        <button class="lightbox__prev"><i class="fas fa-angle-left fa-4x"></i></button>
                        <div class="lightbox__container">  
                        </div>
                    </div>`;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

Lightbox.init();
