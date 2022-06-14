import { PhotographersApi } from "../api/Api.js";
import { PhotographersData } from "../models/Photographers.js";
import { PhotographersCard } from "../templates/PhotographerCard.js";

class App {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographer_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.Data = null;
    this.TemplateSolo;
  }

  async init() {
    const allPhotographersData =
      await this.photographersApi.getAllPhotographers();
    allPhotographersData
      .map((photographerData) => new PhotographersData(photographerData))
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
