import { PhotographersApi } from "../api/Api.js";
import { Photographers } from "../models/Photographers.js";
import { PhotographersCard } from "../templates/photographerCard.js";

class App {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographer_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async init() {
    const allPhotographersData = await this.photographersApi.getAllPhotographers();
    allPhotographersData
      .map((photographerData) => new Photographers(photographerData))
      .forEach((data) => {
        const Template = new PhotographersCard(data);
        this.$photographersSection.appendChild(
          Template.createPhotographersCard(),
        );
      });
    }
  }

const app = new App();
app.init();
