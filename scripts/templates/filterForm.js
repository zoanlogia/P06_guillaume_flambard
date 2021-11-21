class filterForm {
    constructor(Photographers){
        this.Photographers = Photographers

        this.$section = document.createElement('div')
        this.$filterFormTagline = document.querySelector('.filter-form-tagline')
        this.$photographersTagline = document.querySelector('.photographers-tagline')
    }

    async flterPhotographers(tagline){
        this.clearPhotographersTagline()

        const adaptedFilterLib = new FilterPhotographersAdapter(this.Photographers, tagline)
        const FilteredPhotographers = await adaptedFilterLib.filterByTagline()

        FilteredPhotographers.forEach(Photographers => {
            const Template = new PhotographersCard(Photographers)
            this.$photographersTagline.appendChild(Template.createPhotographersCard())
        })
    }


    onChangeFilter() {
        this.$section
            .querySelector('form')
            .addEventListener('change', e => {
                const tagline = e.target.value
                this.filterPhotographers(tagline)
            })
    }

    clearPhotographersTagline() {
        this.$photographersTagline.innerHTML = ""
    }

    render() {
        const filterForm = `
            <form class="filter-form" action="#" method="POST">
                <label for="filter-select">Choississez votre acteur préféré : </label>
                <select name="filter-select" id="filter-select">
                    <option value="">Aucun filtre</option>
                    <option value="arnold">Arnold Schwarzenegger</option>
                    <option value="sylvester">Sylvester Stallone</option>
                </select>
            </form>
        `

        this.$section.innerHTML = filterForm
        this.onChangeFilter()

        this.$filterFormTagline.appendChild(this.$section)
    }
}