class SheetsApiProvider {
    constructor(apiKey, spreadsheetId, discoveryDocs) {
        this.apiKey = apiKey;
        this.discoveryDocs = discoveryDocs;
        this.spreadsheetId = spreadsheetId;
    }

    async init() {
        try {
            await gapi.client.init({
                apiKey: this.apiKey,
                discoveryDocs: this.discoveryDocs,
            });
        } catch (error) {
            console.error('Error initializing API client:', error);
        }
    }

    get(range) {
        return new Promise(async (resolve, reject) => {
            await gapi.load('client', async () => {
                try {
                    await this.init();
                    try {
                        const response = await gapi.client.sheets.spreadsheets.values.get({
                            spreadsheetId: this.spreadsheetId,
                            range: range,
                        });

                        resolve(response.result.values); // Resolve the promise with the values
                    } catch (error) {
                        console.error('Error loading data:', error);
                        reject(error); // Reject the promise with the error
                    }
                } catch (error) {
                    console.error('Error initializing API client:', error);
                    reject(error); // Reject the promise with the error
                }
            });
        });
    }
}

export default SheetsApiProvider;