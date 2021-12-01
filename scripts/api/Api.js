/** @format */

class Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async getPhotographers() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log("an error occurs", err));
  }

  async getPhotographers(id) {
    const data = await fetch(this._url);
    const response = await data.json();
    const photographerList = response.data;
    const mediaList = response.media;

    let detail = {
      info: [],
      medias: [],
    };

    for (let i = 0; i < photographerList.length; i++) {
      const info = photographerList[i];
      if (info.id == id) {
        detail.info = info;
      }
        // console.log(info);
        detail.info.push(info);
    }
    console.log(detail.info);

    for (let i = 0; i < mediaList.length; i++) {
      const medias = mediaList[i];
      if (medias.id == id) {
        detail.medias = medias;
      }
      // console.log(medias);
      detail.medias.push(medias);
      }
      console.log(detail.medias);
    // R2CUP2ER LES INFO
    // BOUUUUUUUCLES !!!

    return detail;
  }
}

export class PhotographersApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getAllPhotographers() {
    return await this.getPhotographers();
  }

  async getOnePhotographer(id) {
    return await this.getPhotographers(id);
  }
}
