/** @format */

import { PhotographersApi } from "../api/Api.js";
import { PhotographerSolo } from "../templates/photographerSolo.js";
import { Lightbox } from "../api/lightbox.js";

class Photographer {
  constructor() {
    this.$photographerSoloSection = document.querySelector(
      ".photographer_solo_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.Data = null;
    this.Templatesolo = null;
    this.Lightbox = null
  }

  async init() {
    // récupérer les id URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const onePhotographerData = await this.photographersApi.getOnePhotographer(
      id,
    );
    this.Data = onePhotographerData;

    const TemplateSolo = new PhotographerSolo(onePhotographerData);
    this.Templatesolo = TemplateSolo;
    this.Lightbox = Lightbox

    this.$photographerSoloSection.appendChild(TemplateSolo.createHeader());
    this.$photographerSoloSection.appendChild(TemplateSolo.createFilter());
    this.$photographerSoloSection.appendChild(TemplateSolo.createGallery());
    this.likesHandler();
    this.$photographerSoloSection.appendChild(TemplateSolo.createCounter());
    this.$photographerSoloSection.appendChild(TemplateSolo.createModal());
    this.myModal();
    this.msgError();
    this.dropBtn();
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
    const span = document.getElementsByClassName("close")[0];
    const btn = document.getElementById("myBtn");

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

  msgError = () => {
    const form = document.getElementById("form1");
    const name = document.getElementById("name");
    const lastName = document.getElementById("lastname");
    const mail = document.getElementById("mail");
    const error = document.getElementsByClassName("error");
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const STATE = {
      name: "",
      lastname: "",
      email: "",
      message: "",
    };

    const initState = () => {
      STATE.name = name.value;
      STATE.lastname = lastName.value;
      STATE.email = mail.value;
      STATE.message = message.value;
    };

    const validation = () => {
      STATE.name.length > 0
        ? (error[0].style.display = "none")
        : (error[0].style.display = "block");
      STATE.lastname.length > 0
        ? (error[1].style.display = "none")
        : (error[1].style.display = "block");
      STATE.email.length > 0 && STATE.email.match(regex)
        ? (error[2].style.display = "none")
        : (error[2].style.display = "block");

      if (STATE.name.length && STATE.lastname.length && STATE.email.length) {
        displayConfirmMessage();
      }
    };

    const displayConfirmMessage = () => {
      const message = document.querySelector(".confirmation");
      const modal = document.querySelector(".modal");
      message.style.display = "block";

      setTimeout(() => {
        modal.style.display = "none";
      }, 4000);
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      initState();
      validation();
      console.log("RESPONSE :", STATE);
    });
  };

  dropBtn = () => {
    const dropdown = document.querySelector(".dropdown");
    const dropBtn = dropdown.querySelector("#dropBtn");
    const myDropdown = dropdown.querySelector("#myDropdown");
    const options = dropdown.querySelectorAll("li.option");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        this.filteredMedia(option.innerHTML);
      });
    });

    dropBtn.addEventListener("click", () => {
      dropdown.classList.toggle("open");
      const selectedFilter = dropBtn.querySelector("span").innerHTML;

      options.forEach((option) => {
        if (option.innerHTML == selectedFilter) {
          option.style.display = "none";
        } else {
          option.style.display = "block";
        }
      });
      myDropdown.classList.toggle("show");
    });
  };

  filteredMedia = (clickedFilter) => {
    const dropdown = document.querySelector(".dropdown");
    const myDropdown = dropdown.querySelector("#myDropdown");
    const dropBtn = document.getElementById("dropBtn");

    myDropdown.classList.toggle("show");
    dropdown.classList.remove("open");

    dropBtn.querySelector("span").innerHTML = clickedFilter;

    const medias = this.Data.medias;

    switch (clickedFilter.toLowerCase()) {
      case "date":
        // réécriture de la dropdown
        medias.sort(
          (a, b) => b.date.replaceAll("-", "") - a.date.replaceAll("-", ""),
        );
        break;
      case "titre":
        medias.sort((a, b) =>
          a.title > b.title ? 1 : a.title === b.title ? 0 : -1,
        );
        break;
      case "popularité":
        medias.sort((a, b) =>
          a.likes > b.likes ? 1 : a.likes === b.likes ? 0 : -1,
        );
        break;
    }

    this.$photographerSoloSection.appendChild(
      this.Templatesolo.createGallery(medias),
    );
    this.likesHandler();
  };
}

const page = new Photographer();
page.init();
