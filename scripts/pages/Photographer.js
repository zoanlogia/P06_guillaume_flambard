/** @format */

import { PhotographersApi } from "../api/Api.js";
import { PhotographerSolo } from "../templates/photographerSolo.js";

class Photographer {
  constructor() {
    this.$photographerSoloSection = document.querySelector(
      ".photographer_solo_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async init() {
    // récupérer les id URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const onePhotographerData = await this.photographersApi.getOnePhotographer(
      id,
    );

    const TemplateSolo = new PhotographerSolo(onePhotographerData);

    this.$photographerSoloSection.appendChild(TemplateSolo.createHeader());
    this.$photographerSoloSection.appendChild(TemplateSolo.createGallery());
    this.likesHandler();
    // this.$photographerSoloSection.appendChild(TemplateSolo.createGallery());
  }

  likesHandler = () => {
    const likesContainer = document.querySelectorAll(".heart-container");

    likesContainer.forEach((likeContainer) => {
      likeContainer.addEventListener("click", () => {
        const span = likeContainer.parentElement.querySelector("span");

        if (likeContainer.classList.contains("clicked")) {
          likeContainer.classList.remove("clicked");
          span.innerHTML = parseInt(span.innerHTML) - 1;
        } else {
          likeContainer.classList.add("clicked");
          span.innerHTML = parseInt(span.innerHTML) + 1;
        }
        this.computeTotalLike();
      });
    });
  };

  computeTotalLike = () => {
    const span = document.querySelectorAll('.gallery_img_desc_like > span')
    let ttx = 0

    span.forEach(like => {
      console.log(like.innerHTML);
      ttx += parseInt(like.innerHTML)
    });
  }
}

const page = new Photographer();
page.init();
