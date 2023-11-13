class CompaniesLogoManager {
    constructor(sheetsApiProvider) {
        this.sheetsApiProvider = sheetsApiProvider;
    }

    async #getLogos() {
        try {
            let logos = await this.sheetsApiProvider.get('CompanyLogos');
            return logos;
        } catch (error) {
            console.error('Error getting logos:', error);
        }
    }

    async loadLogos(containerId) {
        try {
            const logos = await this.#getLogos();
            const container = document.getElementById(containerId);

            var logoHTML = `<ul class="brand-logo-grid list-unstyled">`;
            logos.forEach(logo => {
                logoHTML += `<li class="bg-white">
                            <img src="${logo}" alt="brand logo" stlyle='height:140px'/>
                            </li>`;
            });
            logoHTML += '</ul>';

            container.innerHTML=logoHTML;

        } catch (error) {
            console.error('Error adding Logos:', error);
        }
    }


}

export default CompaniesLogoManager;
