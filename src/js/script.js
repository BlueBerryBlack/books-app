'use strict';

const booksList = document.querySelector('.books-list');
const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

function renderBooks() {
  for (const book of dataSource.books) {
    const generatedHTML = bookTemplate(book);
    const bookDom = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookDom);
  }
}

renderBooks();

const favoriteBooks = [];

function initActions() {
  const bookImages = booksList.querySelectorAll('.book__image');

  for (const img of bookImages) {
    img.addEventListener('dblclick', function (event) {
      event.preventDefault();

      if (img.classList.contains('favorite')) {
        img.classList.remove('favorite');
        const bookId = img.getAttribute('data-id');
        const index = favoriteBooks.indexOf(bookId);
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
        }
      } else {
        img.classList.add('favorite');
        const bookId = img.getAttribute('data-id');
        favoriteBooks.push(bookId);
      }

      console.log('favoriteBooks:', favoriteBooks);
    });
  }
}

initActions();

