const gallery = document.querySelector('.gallery');

export function renderGallery(images) {
  const markupHits = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"><a class="photo-link" href="${largeImageURL}">
      <img class="photo-image"src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
      <p class="info-item"> <b>Likes</b> <span class="info-item--api">${likes}</span></p>
      </span>
      <p class="info-item"> <b>Views</b> <span class="info-item--api">${views}</span></p>
      <p class="info-item"> <b>Comments</b> <span class="info-item--api">${comments} </span></p>
      <p class="info-item"> <b>Downloads</b> <span class="info-item--api">${downloads}</span></p>
      </div>
      </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markupHits);
}
