'use strict';

class BooksList {

  constructor(){

    this.initData();
    this.getElements();
    this.renderBooks();
    this.initActions();
        
  }

  initData() {
    this.Data = dataSource.books;
    this.favoriteBooks = [];
    this.filters = [];

  }

  getElements() {
       
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters');
    this.bookImages = this.booksList.querySelectorAll('.book__image');
    this.bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  }

  renderBooks() {

    for (const book of dataSource.books) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = `${book.rating * 10}%`;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

      const generatedHTML = this.bookTemplate(book);
      const bookDom = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(bookDom);
    }
  }

  initActions() {

    const thisBook = this;

    this.booksList.addEventListener('click', function (event) {
      event.preventDefault();
    });

    this.booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const target = event.target.offsetParent;
        
      if (target.classList.contains('book__image')) {
        if (target.classList.contains('favorite')) {
          target.classList.remove('favorite');
          const bookId = target.getAttribute('data-id');
          const index = thisBook.favoriteBooks.indexOf(bookId);
          if (index !== -1) {
            thisBook.favoriteBooks.splice(index, 1);
          }
        } else {
          target.classList.add('favorite');
          const bookId = target.getAttribute('data-id');
          thisBook.favoriteBooks.push(bookId);
        }

        console.log('favoriteBooks:', this.favoriteBooks);
      }
    });

    thisBook.filtersForm.addEventListener('click', function (event) {
      const target = event.target;

      if (
        target.tagName === 'INPUT' &&
            target.getAttribute('type') === 'checkbox' &&
            target.getAttribute('name') === 'filter'
      ) {
        const filterValue = target.value;

        if (target.checked) {
          thisBook.filters.push(filterValue);
        } else {
          const index = thisBook.filters.indexOf(filterValue);
          if (index !== -1) {
            thisBook.filters.splice(index, 1);
          }
        }
        thisBook.filterBooks();
      }
    });
  }

  filterBooks() {
  
    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (filter === 'adults' && !book.details.adults) {
          shouldBeHidden = true;
          break;
        } else if (filter === 'nonFiction' && !book.details.nonFiction) {
          shouldBeHidden = true;
          break;
        } 
      }

      const bookImage = this.booksList.querySelector(`[data-id="${book.id}"].book__image`);

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
               
    if (rating >= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating >= 6 && rating < 8) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating < 6) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

new BooksList();