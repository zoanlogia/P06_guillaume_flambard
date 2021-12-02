import { PhotographersApi } from "../api/Api.js";

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
    const id = urlParams.get('id')

    const photographerData = await this.photographersApi.getOnePhotographer(id);

    console.log(photographerData);
  }
}

const page = new Photographer();
page.init();