'use strict';

// document.getElementById('test-button').addEventListener('click', function () {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

{
  const titleClickHandler = function (event) {
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    event.preventDefault();

    const clickedElement = this;

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const href = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(href);

    /* add class 'active' to the correct article */

    correctArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const generateTitleLinks = function() {
    console.log('generateTitleLinks is processed');

    /* remove elements from list of links */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* FOR EACH ARTICLE
    /* read id and save it in const */

    /* find element with title and save it in const */

    /* create html code with given data and save it in const */

    /* paste created html code to list of links in left column */

    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTML  = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;

      console.log(html);
    }

    titleList.innerHTML = html;

  };

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}