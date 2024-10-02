// Получение параметров из URL
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('mangaId');
const title = urlParams.get('title');
let currentPage = 1;

// Устанавливаем название манги в заголовок страницы
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mangaTitle').innerText = title;

  // Загрузка первой страницы манги
  fetchMangaPage(mangaId, currentPage);

  // Навигация между страницами
  document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchMangaPage(mangaId, currentPage);
  });

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMangaPage(mangaId, currentPage);
    }
  });
});

// Функция для получения страницы манги
async function fetchMangaPage(mangaId, page) {
  try {
    const response = await fetch(`http://localhost:3000/manga/${mangaId}/pages?page=${page}`);
    const data = await response.json();

    if (response.ok) {
      // Обновляем изображение на странице
      document.getElementById('mangaImage').src = data.url;
    } else {
      console.error('Ошибка:', data.message);
    }
  } catch (error) {
    console.error('Ошибка при загрузке страницы:', error);
  }
}
