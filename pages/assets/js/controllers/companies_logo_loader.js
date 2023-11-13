
import SheetsConstants from "../constants/sheets_constants.js";
import SheetsApiProvider from "../providers/sheets_api_provider.js";
import CompaniesLogoManager from "../services/companies_logo_manager.js";
import Splash from "../services/splash.js";

async function initializeAndLoadData() {
    const sheetsApiProvider = new SheetsApiProvider(
        SheetsConstants.API_KEY,
        SheetsConstants.SPREADSHEET_ID,
        SheetsConstants.DISCOVERY_DOCS
    );

    const companyLogoManager = new CompaniesLogoManager(sheetsApiProvider);

    try {
        await companyLogoManager.loadLogos('companies-logo-row');
        Splash.hideSplash();
    } catch (error) {
        console.error('Error initializing and loading data:', error);
    }
}

window.onload = initializeAndLoadData;