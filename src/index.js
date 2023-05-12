import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { picturesApi } from './js/picturesApi';
import { respPictures } from './js/respPictures';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form-input');
const searchBtn = document.querySelector('.search-form-btn');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let searchTerm = '';
const perPage = 40;
let page = 1;
let SimpleLightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', searchForm);
loadBtn.addEventListener('click', loadMore);

function searchForm(ev) {
  ev.preventDefault();
  clearGallery();
  searchTerm = ev.currentTarget.searchQuery.value.trim();

  if (searchTerm === '') {
    Notiflix.Notify.info('Oops...Nothing entered, please try again.');
    return;
  }

  picturesApi(searchTerm, page, perPage)
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
          loadBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

