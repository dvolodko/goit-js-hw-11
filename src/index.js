// Зареєструватись на піксабей і отримати свій ключ ✔️
// Зробити запит на піксабей і отримати картинку ✔️
// Зробити запит і отримати масив картинок ✔️
// Створити функцію рендерингу результату фетча на сторінці ✔️
// Створити фронтент з інпутом і сабміт кнопкою ✔️
// створити CSS стилізацію сторінки
// додати пагінацію
// додати нескінчений скрол
// додати нотіфлікс повідомлення
// додати сімпллайтбокс галерею

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './js/api-service';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  apiService.resetPage();
  const pictures = await apiService.getPictures();
  renderCards(pictures.data.hits);
}

async function onLoadMore() {
  const pictures = await apiService.getPictures();
  console.log(pictures);
}

function renderCards(pictureCards) {
  console.log(pictureCards);
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
  refs.gallery.innerHTML = markup;
}
