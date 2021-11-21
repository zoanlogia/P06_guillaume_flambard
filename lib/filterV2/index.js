
   
class FilterV2 {
    /**
     * 
     * @param {string} tagline
     * @param {array} Photographers 
     * @returns 
     */
    static async filterByTags(tagline, Photographers) {
        await new Promise(resolve => setTimeout(resolve, 200))


        if (!tagline) {
            return Photographers
        }

        return Photographers.filter(Photographer => Photographer.tagline === tagline)
    }
}