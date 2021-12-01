/** @format */

class App {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographer_section",
    );
    this.photographersApi = new PhotographersApi("/data/photographers.json");
  }

  async main() {
    const photographersData = await this.photographersApi.getPhotographers();

    photographersData
      .map((photographers) => new Photographers(photographers))
      .forEach((photographers) => {
        const Template = new PhotographersCard(photographers);
        this.$photographersSection.appendChild(
          Template.createPhotographersCard(),
        );
        console.log(photographers);
      });

    // photographersData.forEach((photographers) => {
    //   const Template = new PhotographerCard(photographers);
    //   this.$photographerSection.appendChild(Template.createPhotographerCard());
    // });
  }
}

const app = new App();
app.main();
