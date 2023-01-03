// Зареєструватись на піксабей і отримати свій ключ ✔️
// Зробити запит на піксабей і отримати картинку ✔️
// Зробити запит і отримати масив картинок ✔️
// Створити функцію рендерингу результату фетча на сторінці
// Створити фронтент з інпутом і сабміт кнопкою
// додати пагінацію
// додати нескінчений скрол
// додати нотіфлікс повідомлення
// додати сімпллайтбокс галерею

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchForm: document.querySelector(''),
};

const axios = require('axios').default;
const API_KEY = '32552782-0d4c86680018457e820f20492';

async function getPicture() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flowers&image_type=photo&per_page=50`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getPicture();
