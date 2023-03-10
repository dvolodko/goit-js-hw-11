// Зареєструватись на піксабей і отримати свій ключ ✔️
// Зробити запит на піксабей і отримати картинку ✔️
// Зробити запит і отримати масив картинок ✔️
// Створити функцію рендерингу результату фетча на сторінці ✔️
// Створити фронтент з інпутом і сабміт кнопкою ✔️
// створити CSS стилізацію сторінки ✔️
// додати пагінацію ✔️
// додати нескінчений скрол ❌
// додати нотіфлікс повідомлення ✔️
// додати сімпллайтбокс галерею ❌

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './js/api-service';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
let totalHits = 0;

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (!apiService.query) {
    refs.gallery.innerHTML = '';
    loadMoreBtn.hide();
    Notify.failure('Sorry, you need to search something. Please try again.');
    return;
  }
  refs.gallery.innerHTML = '';
  loadMoreBtn.show();
  loadMoreBtn.disable();
  apiService.resetPage();
  try {
    const pictures = await apiService.getPictures();
    totalHits = pictures.data.totalHits;
    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
    } else if (totalHits <= 40) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderCards(pictures.data.hits);
      loadMoreBtn.hide();
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderCards(pictures.data.hits);
      loadMoreBtn.enable();
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onLoadMore() {
  try {
    loadMoreBtn.disable();
    if (40 * apiService.page > totalHits) {
      const pictures = await apiService.getPictures();
      renderCards(pictures.data.hits);
      loadMoreBtn.hide();
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      const pictures = await apiService.getPictures();
      renderCards(pictures.data.hits);
      loadMoreBtn.enable();
    }
  } catch (error) {
    console.log(error.message);
  }
}

function renderCards(pictureCards) {
  const markup = pictureCards
    .map(
      pictureCard => `<div class="photo-card">
    <img src="${pictureCard.webformatURL}" alt="${pictureCard.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${pictureCard.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${pictureCard.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${pictureCard.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${pictureCard.downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
