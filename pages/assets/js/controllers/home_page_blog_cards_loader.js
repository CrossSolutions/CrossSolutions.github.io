import SheetsConstants from "../constants/sheets_constants.js";
import SheetsApiProvider from "../providers/sheets_api_provider.js";
import BlogsManager from "../services/blogs_manager.js";
import Splash from "../services/splash.js";

async function initializeAndLoadData() {
    Splash.showSplash();
    const sheetsApiProvider = new SheetsApiProvider(
        SheetsConstants.API_KEY,
        SheetsConstants.SPREADSHEET_ID,
        SheetsConstants.DISCOVERY_DOCS
    );

    const blogsManager = new BlogsManager(sheetsApiProvider);

    try {
        await blogsManager.addBlogCardsToContainer('blogs-row', 3);
        // console.log("DONE")
        Splash.hideSplash();
    } catch (error) {
        console.error('Error initializing and loading data:', error);
    }
}

window.onload = initializeAndLoadData;