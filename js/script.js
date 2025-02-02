"use strict";

const MAX_LENGTH = 200;

const authors = ['Tyrone', 'Ava', 'Elijah', 'Lucas', 'Ebony', 'Keisha', 'Jemila', 'Daniel'];

let articles = [
  {
    title: 'CSS Selectors',
    author: 'Tyrone',
    date: new Date(2023, 1, 20),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },

  {
    title: 'Cascading',
    author: 'Jemila',
    date: new Date(2023, 2, 1),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.'
  },

  {
    title: 'CSS Grid',
    author: 'Larry',
    date: new Date(2023, 2, 12),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.'
  }
];


const articlesWrapper = document.querySelector('.articles-wrapper');

/**
 * This function creates a DOM elment with information from the article, and returns the element to the caller.
 * @param {string} date - date the article is posted
 * @return {object} header - DOM element
 */
 
 function createArticleHeader(name, date) {
  const header = document.createElement('div');
  header.classList.add('article-header');

  let index = authors.findIndex(author => author === name);
  
  const avatar = document.createElement('img');
  if(index !== -1)
    avatar.src = `images/avatar${index}.png`;
  else
    avatar.src = 'images/default.jpeg';
  avatar.alt = 'profile picture';
  avatar.classList.add('avatar');
  
  const content = document.createElement('div');
  content.textContent = `${name} · ${date.toDateString()}`;
  header.append(avatar, content);
  return header;
}


/**
 * This function splits the given string into two substrings based on the index, and returns the array which stores the substrings.
 * @param {string} text - a string
 * @param {index} number - index at which the string is being splitted at
 * @return {array} nextText - an array stores the two substrings
 */

function splitText(text, index) {
  let newText = [];
  newText[0] = text.substring(0, index);
  newText[1] = text.substring(index, text.length);
  return newText;
}

/**
 * This function creates a DOM elment with information from an article, and returns the element to the caller.
 * @param {string} title - title of an article
 * @param {string} content - content of an article
 * @return {object} body - a DOM element
 */
 
function createArticleBody(title, content) {
  const body = document.createElement('div');
  body.classList.add('article-body');
  const articleTitle = document.createElement('h3');
  articleTitle.textContent = title;

  const articleContent = document.createElement('p');
 
  if(content.length > MAX_LENGTH) {
    const texts = splitText(content, MAX_LENGTH)
    articleContent.textContent = texts[0];

    const dotSpan = document.createElement('span');
    dotSpan.textContent  = '...';

    const moreContentSpan = document.createElement('span');
    moreContentSpan.textContent  = texts[1];
    moreContentSpan.classList.add('hidden');

    const moreBtn = document.createElement('button');
    moreBtn.textContent = 'Read More';
    moreBtn.classList.add('btn');
    articleContent.append(dotSpan, moreContentSpan);
    body.append(articleTitle, articleContent, moreBtn);

  } else {
    articleContent.textContent = content;
    body.append(articleTitle, articleContent);
  }

  return body;
  
}

/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {

  const articleContainer = document.createElement('article');
  articleContainer.classList.add('article-container');

  const articleHeader = createArticleHeader(article.author, article.date);
  const articleBody = createArticleBody(article.title, article.content);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '✕'; 

  articleContainer.append(deleteBtn, articleHeader, articleBody);
  articlesWrapper.append(articleContainer);
}

articles.forEach(article=>{
  addEntry(article);
});



//submit event button, adds new entry to array and DOM
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const contentInput = document.querySelector('#content');
 
  if(titleInput.reportValidity() && authorInput.reportValidity() && contentInput.reportValidity()){
    const title = titleInput.value;
    const author = authorInput.value;
    const content = contentInput.value;

    titleInput.value = '';
    authorInput.value = '';
    contentInput.value = '';

    const date =  new Date();
    const article = {title, author, date, content};
    articles.push(article); 

    addEntry(article);

    event.preventDefault();

  }
  

});


//delete event when x button is clicked
document.querySelector('.articles-wrapper').addEventListener('click', function(event) {
  
  if(event.target.classList.value === 'delete-btn'){
    const parentElement = event.target.closest('article');
    const selectedTitle = parentElement.children[2].children[0].innerText;

    if(articles.filter((article) => article.title === selectedTitle).length !== 0){
      articles = articles.filter((article) => article.title !== selectedTitle);
    }

    parentElement.remove();

    console.log(articles);
  }


});

//show more/less content button event
document.querySelector('.articles-wrapper').addEventListener('click', function(event) {

  if(event.target.classList.value === 'btn'){
    const pElement = event.target.previousElementSibling;
    const spans = pElement.querySelectorAll('span');

    spans.forEach(span => span.classList.toggle('hidden'));

    if(event.target.textContent === 'Read More'){
      event.target.textContent = 'Read Less';
    } else{
      event.target.textContent = 'Read More';
    }
  }

});
