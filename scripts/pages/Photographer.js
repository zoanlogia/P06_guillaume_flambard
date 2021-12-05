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
      const id = urlParams.get('id')
      const onePhotographerData = await this.photographersApi.getOnePhotographer(id);

      const TemplateSolo = new PhotographerSolo(onePhotographerData)
      this.$photographerSoloSection.appendChild(
        TemplateSolo.createPhotographerSolo()
      );
    }
  }
  
  const page = new Photographer()
  page.init();