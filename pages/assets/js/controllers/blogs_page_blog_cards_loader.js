import SheetsConstants from "../constants/sheets_constants.js";
import SheetsApiProvider from "../providers/sheets_api_provider.js";
import BlogsManager from "../services/blogs_manager.js";
import Splash from "../services/splash.js";


async function initializeAndLoadData() {
    Splash.showSplash();
    const sheetsApiProvider = new SheetsApiProvider(
        SheetsConstants.API_KEY,
        SheetsConstants.SPREADSHEET_ID,
        SheetsConstants.DISCOVERY_DOCS,
    );

    const blogsManager = new BlogsManager(sheetsApiProvider);

    try {
        await blogsManager.addBlogCardsToContainer(
            'featured-blogs-row', 2, 0,
            ['col-lg-6', 'col-md-12'],
            ['feature-article', 'my-3'],
        );
        await blogsManager.addBlogCardsToContainer(
            'blogs-container', 0, 2,
            ['col-lg-4', 'col-md-6'],
            ['my-3'],
        );
        Splash.hideSplash();
    } catch (error) {
        console.error('Error initializing and loading data:', error);
    }
}

window.onload = initializeAndLoadData;