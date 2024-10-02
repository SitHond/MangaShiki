// Получение параметров из URL
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('mangaId');
const title = urlParams.get('title');
let currentPage = 1;

// Элементы для работы
const mangaTitleElement = document.getElementById('mangaTitle');
const mangaImageElement = document.getElementById('mangaImage');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');

// Устанавливаем название манги в заголовок страницы
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!mangaId || !title) {
      throw new Error('Не удалось получить ID манги или название из URL.');
    }
    
    mangaTitleElement.innerText = title;

    // Загрузка первой страницы манги
    fetchMangaPage(mangaId, currentPage);
    
    // Навигация между страницами
    nextButton.addEventListener('click', () => {
      currentPage++;
      fetchMangaPage(mangaId, currentPage);
    });

    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMangaPage(mangaId, currentPage);
      }
    });

  } catch (error) {
    console.error('Ошибка при инициализации:', error);
    disableButtons();
  }
});

// Функция для получения страницы манги
async function fetchMangaPage(mangaId, page) {
  try {
    const response = await fetch(`http://localhost:3000/manga/${mangaId}/pages?page=${page}`);
    const data = await response.json();

    if (response.ok) {
      // Обновляем изображение на странице
      mangaImageElement.src = data.url; // Убедитесь, что это правильный путь к изображению
      enableButtons();  // Включаем кнопки после успешной загрузки страницы
    } else {
      console.error('Ошибка загрузки страницы:', data.message);
      disableButtons();
    }
  } catch (error) {
    console.error('Ошибка при загрузке страницы манги:', error);
    disableButtons();  // Отключаем кнопки при ошибке
  }
}

// Функции для управления кнопками
function disableButtons() {
  prevButton.disabled = true;
  nextButton.disabled = true;
}

function enableButtons() {
  prevButton.disabled = false;
  nextButton.disabled = false;
}
