import ArrayUtils from "../utilities/array_utils.js";

class BlogsManager {
    constructor(sheetsApiProvider) {
        this.sheetsApiProvider = sheetsApiProvider;
    }

    async #getBlogs(skip, count) {
        try {
            let blogs = await this.sheetsApiProvider.get('Blogs');
            blogs = ArrayUtils.customSort(blogs).slice(skip, count == 0 ? blogs.length : count);
            return blogs;
        } catch (error) {
            console.error('Error getting blogs:', error);
        }
    }

    #createBlogCard(blog, outerDivClasses, innerDivClasses) {

        // Create the outermost container
        const containerDiv = document.createElement('div');
        containerDiv.classList.add(...outerDivClasses);

        // Create the 'single-article' div
        const singleArticleDiv = document.createElement('div');
        singleArticleDiv.classList.add('single-article', 'rounded-custom', ...innerDivClasses);

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

        return containerDiv;
    }

    async addBlogCardsToContainer(containerId, count, skip, outerDivClasses, innerDivClasses) {
        try {
            const blogs = await this.#getBlogs(skip, count);
            const container = document.getElementById(containerId);
            blogs.forEach(blog => {
                container.appendChild(this.#createBlogCard(blog, outerDivClasses, innerDivClasses));
            });
        } catch (error) {
            console.error('Error adding blog cards:', error);
        }
    }
}

export default BlogsManager;
