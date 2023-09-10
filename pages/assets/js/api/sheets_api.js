const API_KEY = 'AIzaSyDIhWP3YvRryHwyAtI4buFO80DChwe4HgI';
const SPREADSHEET_ID = '12oAMWeL5oLFJi2LQgZXzePj5lBNwX2J758hOEpx0jKc';
const RANGE = 'Blogs!A1:H4';

function convertArrayToObjects(dataArray) {
    const [headerRow, ...rows] = dataArray; // Extract header row and rest of the rows
    const headerKeys = headerRow.map(String); // Ensure header keys are strings

    const objectsArray = rows.map(row => {
        const obj = {};
        row.forEach((value, index) => {
            obj[headerKeys[index]] = value;
        });
        return obj;
    });

    return objectsArray;
}

// Function to retrieve data from a Google Sheet
function loadData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE, // Replace with your sheet and range
    }).then(function (response) {
        let values = convertArrayToObjects(response.result.values);
        const blogsRow = document.getElementById('blogs-row');
        values.forEach(blog => {

            // Create the outermost container
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('col-lg-4', 'col-md-6');

            // Create the 'single-article' div
            const singleArticleDiv = document.createElement('div');
            singleArticleDiv.classList.add('single-article', 'rounded-custom', 'mb-4', 'mb-lg-0');

            // Create the 'a' element for the article image
            const articleImgLink = document.createElement('a');
            articleImgLink.href = blog.Url;
            articleImgLink.classList.add('article-img');

            // Create the image element
            const imgElement = document.createElement('img');
            imgElement.src = blog.Thumbnail;
            imgElement.alt = 'article';
            imgElement.classList.add('img-fluid');

            // Append the image to the 'a' element
            articleImgLink.appendChild(imgElement);

            // Create the 'article-content' div
            const articleContentDiv = document.createElement('div');
            articleContentDiv.classList.add('article-content', 'p-4');

            // Create the 'article-category' div
            const articleCategoryDiv = document.createElement('div');
            articleCategoryDiv.classList.add('article-category', 'mb-4', 'd-block');

            // Create the 'a' element for the category
            const categoryLink = document.createElement('a');
            categoryLink.href = 'pages/javascript:;';
            categoryLink.classList.add('d-inline-block', 'text-warning', 'badge', 'bg-warning-soft');
            categoryLink.textContent = blog.Tags;

            // Append the category link to the 'article-category' div
            articleCategoryDiv.appendChild(categoryLink);

            // Create the 'a' element for the article title
            const articleTitleLink = document.createElement('a');
            articleTitleLink.href = blog.Url;

            // Create the 'h2' element for the article title
            const articleTitle = document.createElement('h2');
            articleTitle.classList.add('h5', 'article-title', 'limit-2-line-text');
            articleTitle.textContent = blog.Title;

            // Append the title to the 'a' element
            articleTitleLink.appendChild(articleTitle);

            // Create the 'p' element for the article text
            const articleText = document.createElement('p');
            articleText.classList.add('limit-2-line-text');
            articleText.textContent = blog.Content;

            // Create the 'a' element for the avatar
            const avatarLink = document.createElement('a');
            // avatarLink.href = 'pages/javascript:;';
            avatarLink.href = '#';

            // Create the 'd-flex' div for aligning avatar and info
            const dFlexDiv = document.createElement('div');
            dFlexDiv.classList.add('d-flex', 'align-items-center', 'pt-4');

            // Create the 'avatar' div
            const avatarDiv = document.createElement('div');
            avatarDiv.classList.add('avatar');

            // Create the avatar image
            const avatarImg = document.createElement('img');
            avatarImg.src = blog.AuthorImage;
            avatarImg.alt = 'avatar';
            avatarImg.width = '40';
            avatarImg.classList.add('img-fluid', 'rounded-circle', 'me-3');

            // Append the avatar image to the 'avatar' div
            avatarDiv.appendChild(avatarImg);

            // Create the 'avatar-info' div
            const avatarInfoDiv = document.createElement('div');
            avatarInfoDiv.classList.add('avatar-info');

            // Create the 'h6' element for the avatar name
            const avatarName = document.createElement('h6');
            avatarName.classList.add('mb-0', 'avatar-name');
            avatarName.textContent = blog.AuthorName;

            // Create the 'span' element for the date
            const dateSpan = document.createElement('span');
            dateSpan.classList.add('small', 'fw-medium', 'text-muted');
            dateSpan.textContent = blog.DatePosted;

            // Append the name and date to the 'avatar-info' div
            avatarInfoDiv.appendChild(avatarName);
            avatarInfoDiv.appendChild(dateSpan);

            // Append the 'avatar' and 'avatar-info' divs to the 'd-flex' div
            dFlexDiv.appendChild(avatarDiv);
            dFlexDiv.appendChild(avatarInfoDiv);

            // Append all elements to the 'article-content' div
            articleContentDiv.appendChild(articleCategoryDiv);
            articleContentDiv.appendChild(articleTitleLink);
            articleContentDiv.appendChild(articleText);
            articleContentDiv.appendChild(avatarLink);
            articleContentDiv.appendChild(dFlexDiv);

            // Append the 'a' element for the article image to the 'single-article' div
            singleArticleDiv.appendChild(articleImgLink);

            // Append the 'article-content' div to the 'single-article' div
            singleArticleDiv.appendChild(articleContentDiv);

            // Append the 'single-article' div to the outer container
            containerDiv.appendChild(singleArticleDiv);

            // Append the outer container to the target element
            blogsRow.appendChild(containerDiv);


        });
        // sheetData.innerHTML = JSON.stringify(values);
    });
}
/*
<div class="col-lg-4 col-md-6">
<div class="single-article rounded-custom mb-4 mb-lg-0">
    <a href="pages/blog-single.html" class="article-img">
        <img src="pages/assets/img/blog/blog-1.jpg" alt="article" class="img-fluid">
    </a>
    <div class="article-content p-4">
        <div class="article-category mb-4 d-block">
            <a href="pages/javascript:;"
                class="d-inline-block text-warning badge bg-warning-soft">Design</a>
        </div>
        <a href="pages/blog-single.html">
            <h2 class="h5 article-title limit-2-line-text">Do you really understand the concept
                of product value?</h2>
        </a>
        <p class="limit-2-line-text">Society is fragmenting into two parallel realities. In one
            reality, you have infinite upside and opportunity. In the other reality, you’ll
            continue to see the gap between your standard of living and those at the top grow
            more and more.</p>

        <a href="pages/javascript:;">
            <div class="d-flex align-items-center pt-4">
                <div class="avatar">
                    <img src="pages/assets/img/testimonial/6.jpg" alt="avatar" width="40"
                        class="img-fluid rounded-circle me-3">
                </div>
                <div class="avatar-info">
                    <h6 class="mb-0 avatar-name">Jane Martin</h6>
                    <span class="small fw-medium text-muted">April 24, 2021</span>
                </div>
            </div>
        </a>

    </div>
</div>
</div>
*/

// Load the Google Sheets API
gapi.load('client', function () {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        // Call the function to load data when the API client is initialized
        loadData();
    });
});
