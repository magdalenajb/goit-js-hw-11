import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPictures } from './js/picturesApi';
import { renderGallery } from './js/respPictures';

const searchForm = document.querySelector('.search-form');
const searchText = document.querySelector('.search-form-input');
const searchBtn = document.querySelector('.search-form-btn');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let simpleLightbox = new SimpleLightbox('.gallery a');

let searchTerm = '';
let page = 1;
const perPage = 40;

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', morePagesBtn);

function handleSubmit(event) {
  event.preventDefault();
  clearGallery();
  searchTerm = event.currentTarget.searchQuery.value.trim();
  // console.log('searchTerm: ', searchTerm);
  if (searchTerm === '') {
    Notiflix.Notify.info('Oops...Nothing entered, please try again.');
    return;
  }

  getPictures(searchTerm, page, perPage)
    .then(foundData => {
      if (foundData.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(foundData.hits);
        simpleLightbox.refresh();
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        if (foundData.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function morePagesBtn() {
  page++;
  getPictures(searchTerm, page, perPage)
    .then(foundData => {
      const maxPageNum = Math.ceil(foundData.totalHits / perPage);
      // console.log('maxPageNum: ', maxPageNum);
      // console.log('Page number: ', page);
      // console.log('TotalHits found: ', foundData.totalHits);
      renderGallery(foundData.hits);
      simpleLightbox.refresh();
      if (page === maxPageNum) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => console.log(error));
}

function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
}
