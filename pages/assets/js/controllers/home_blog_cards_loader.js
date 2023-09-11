import SheetsConstants from "../constants.js";
import SheetsApiProvider from "../providers/sheets_api_provider.js";
import BlogsManager from "../services/blogs_manager.js";

function initializeAndLoadData() {
    const sheetsApiProvider = new SheetsApiProvider(
        SheetsConstants.API_KEY,
        SheetsConstants.SPREADSHEET_ID,
        SheetsConstants.DISCOVERY_DOCS
    );

    const blogsManager = new BlogsManager(sheetsApiProvider);

    try {
        blogsManager.addBlogCardsToContainer('blogs-row', 3);
    } catch (error) {
        console.error('Error initializing and loading data:', error);
    }
}

window.onload = initializeAndLoadData;