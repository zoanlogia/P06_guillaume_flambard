/** @format */

class Solo {
  constructor() {
    this.$photographerSoloSection = document.querySelector(
      ".photographer_solo_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async main() {
    const photographersData = await this.photographersApi.getPhotographers();

    photographersData
      .map((photographers) => new Photographers(photographers))
      .forEach((photographers) => {
        const Template = new PhotographerSolo(photographers);
        this.$photographerSoloSection.appendChild(
          Template.createPhotographerSolo(),
        );
      });

    photographersData.forEach((photographers) => {
      const Template = new PhotographerSolo(photographers);
      this.$section.appendChild(Template.createPhotographerSolo());
    });
  }
}

const solo = new PhotographerSolo();
solo.main();
