'use strict';

{
  /* USEFUL CONSTS */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optActiveTagLinksSelector = 'a.active[href^="#tag-"]',
    optArticleGradeSelector = '.post-givenGrade',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optGradesListSelector = '.grades';





  /* TITLE ACTIONS */




  /* Generating title links */


  const generateTitleLinks = function (customSelector = '') {

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    /* remove elements from list of links */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* FOR EACH ARTICLE */
    for (let article of articles) {
      /* read id and save it in const */
      const articleId = article.getAttribute('id');

      /* find element with title and save it in const */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create html code with given data and save it in const */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* paste created html code to list of links in left column */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

  };

  generateTitleLinks();



  /* Title click handler */


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


  /* Adding click handler to title links */


  const addTitleClickHandlerToLinks = function () {
    /* find all links to articles */
    const links = document.querySelectorAll('.titles a');

    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', titleClickHandler);
    }
    /* END LOOP: for each link */
  };

  addTitleClickHandlerToLinks();






  /* TAGS ACTIONS */





  /* Calculating min and max amount of tags usage */

  const calculateTagsParams = function (tags = '') {
    const firstValue = Object.values(tags)[0];

    let min = firstValue;
    let max = firstValue;

    for (let tag in tags) {
      if (tags[tag] < min) {
        min = tags[tag];
      }

      if (tags[tag] > max) {
        max = tags[tag];
      }
    }

    let params = { max, min };
    return params;
  };


  /* Calculating tags classes */


  const calculateTagClass = function (count, params) {
    let classNumber = optCloudClassPrefix + Math.floor((count - params.min) / (params.max - params.min) * optCloudClassCount + 1);
    if (classNumber === 6) {
      return classNumber--;
    }
    return classNumber;
  };


  /* Generating tags */


  const generateTags = function () {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articlesAll = document.querySelectorAll('article');

    /* START LOOP: for every article: */
    for (let article of articlesAll) {
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const tags = article.getAttribute('data-tags');

      /* split tags into array */
      const tagsArray = tags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of tagsArray) {
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = wrapper.innerHTML + html;
    }
    /* END LOOP: for every article: */


    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>';
      console.log(calculateTagClass(allTags[tag], tagsParams));
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();


  /* Tags click handler */


  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    const aElement = clickedElement.querySelector('a');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = aElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll(optActiveTagLinksSelector);

    /* START LOOP: for each active tag link */
    for (let activeTagLink of tagLinksActive) {
      /* remove class active */
      activeTagLink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of sameTagLinks) {
      /* add class active */
      tagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    addTitleClickHandlerToLinks();
  };


  /* Adding tag handler to tag links */


  const addClickListenersToTags = function () {
    /* find all links to tags */
    const linksToTags = document.querySelectorAll('.post-tags .list li');
    const linksToTagsInRightColumn = document.querySelectorAll('.tags li');

    /* START LOOP: for each link */
    for (let linkToTag of linksToTags) {
      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
   
    /* START LOOP: for each link */
    for (let linkToTag of linksToTagsInRightColumn) {
      /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  };

  addClickListenersToTags();





  /* GRADES ACTIONS */





  /* Write function generateGrades similar to genrateTags func */

  const generateGradesLinks = function () {
    /* [NEW] create a new variable allGrades with an empty object */
    let allGrades = {};

    /* find all articles */
    const articlesAll = document.querySelectorAll('article');

    /* START LOOP: for every article: */
    for (let article of articlesAll) {
      /* find grade wrapper */
      const wrapper = article.querySelector(optArticleGradeSelector);

      /* make html variable with empty string */
      let html = '';

      /* get grade from data-tags attribute */
      const grade = article.getAttribute('data-grade');

      /* generate HTML of the link */
      const linkHTML = '<a href="#grade-' + grade + '">' + grade + '</a>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allGrades */
      if (!allGrades[grade]) {
        /* [NEW] add generated code to allGrades array */
        allGrades[grade] = 1;
      } else {
        allGrades[grade]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML += html;
    }
    /* END LOOP: for every article: */

    /* [NEW] find list of grades in right column */
    const gradesList = document.querySelector(optGradesListSelector);

    /* [NEW] create variable for all links HTML code */
    let allGradesHTML = '';

    /* [NEW] START LOOP: for each grade in allTags: */
    for (let grade in allGrades) {
      /* [NEW] generate code of a link and add it to allGradesHTML */
      allGradesHTML += '<li><a href="#grade-' + grade + '"><span>' + grade + ' (' + allGrades[grade] + ') ' + '</span></a></li>';
    }
    /* [NEW] END LOOP: for each grade in allGrades: */

    /* [NEW] add HTML from allGradesHTML to gradesList */
    gradesList.innerHTML = allGradesHTML;
  };

  generateGradesLinks();


  /* Write function gradeClickHandler similar to tagClickHandler func */


  const gradeClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    const aElement = clickedElement.querySelector('a');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = aElement.getAttribute('href');

    /* make a new constant "grade" and extract tag from the "href" constant [???] */
    const grade = href.replace('#grade-', '');

    /* find all tag links with "href" attribute equal to the "href" constant */
    const sameGradeLinks = document.querySelectorAll('a[href="' + grade + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of sameGradeLinks) {
      /* add class active */
      tagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-grade="' + grade + '"]');
    addTitleClickHandlerToLinks();
  };


  /* Write function addClickListenersToGrades similar to addClickListenersToTags func */


  const addClickListenersToGrades = function () {
    /* find all links to grades */
    const linksToGrades = document.querySelectorAll('.post .post-givenGrade');
    const linksToGradesInRightColumn = document.querySelectorAll('.grades li');

    /* START LOOP: for each link */
    for (let linkToGrade of linksToGrades) {
      /* add tagClickHandler as event listener for that link */
      linkToGrade.addEventListener('click', gradeClickHandler);
    }
    /* END LOOP: for each link */

    /* START LOOP: for each link */
    for (let linkToGrade of linksToGradesInRightColumn) {
      /* add tagClickHandler as event listener for that link */
      linkToGrade.addEventListener('click', gradeClickHandler);
    }
    /* END LOOP: for each link */

  };

  addClickListenersToGrades();

}