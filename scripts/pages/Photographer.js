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
    this.$photographerSoloSection.appendChild(TemplateSolo.createCounter());
    this.$photographerSoloSection.appendChild(TemplateSolo.createModal());
    this.myModal()
  }

  likesHandler = () => {
    const likesContainer = document.querySelectorAll(".heart-container");

    likesContainer.forEach((likeContainer) => {
      likeContainer.addEventListener("click", () => {
        const span = likeContainer.parentElement.querySelector("span");
        const icon = likeContainer.querySelector(".icon-full");

        if (likeContainer.classList.contains("clicked")) {
          likeContainer.classList.remove("clicked");
          span.innerHTML = parseInt(span.innerHTML) - 1;
          icon.style.visibility = "hidden";
        } else {
          likeContainer.classList.add("clicked");
          span.innerHTML = parseInt(span.innerHTML) + 1;
          icon.style.visibility = "visible";
        }
        this.computeTotalLike();
      });
    });
  };

  computeTotalLike = () => {
    const span = document.querySelectorAll(
      ".heart-container > span:nth-child(1)",
    );
    let ttx = 0;

    span.forEach((like) => {
      console.log(like.innerHTML);
      ttx += parseInt(like.innerHTML);
    });

    const totalLike = document.querySelector(".ttx");
    totalLike.innerHTML = ttx.toString();
  };

  myModal = () => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    span.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });
  };
}

const page = new Photographer();
page.init();
