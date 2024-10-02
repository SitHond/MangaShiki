// Проверяем, что мы на странице манги по наличию нужного класса
const mangaPageUrlPattern = /shikimori\.(me|one)\/mangas\/\d+/;

if (mangaPageUrlPattern.test(window.location.href)) {
  try {
    // Находим блок с классом "c-info-right"
    const infoRightBlock = document.querySelector('.c-info-right');

    if (!infoRightBlock) {
      throw new Error('Не найден блок с классом "c-info-right" на странице.');
    }

    // Создаем кнопку
    const button = document.createElement('button');
    button.innerText = 'Читать в приложении';
    button.style = 'padding: 10px; margin-top: 10px; background-color: #5a67d8; color: white; border: none; cursor: pointer;';

    // Добавляем обработчик клика по кнопке
    button.addEventListener('click', () => {
      try {
        const mangaIdMatch = window.location.href.match(/\d+/);
        if (!mangaIdMatch) {
          throw new Error('Не удалось извлечь ID манги из URL.');
        }
        const mangaId = mangaIdMatch[0];

        const mangaTitleElement = document.querySelector('h1');
        if (!mangaTitleElement) {
          throw new Error('Не найден заголовок манги (тег h1) на странице.');
        }
        const mangaTitle = mangaTitleElement.innerText;

        // Отправляем сообщение в background.js для открытия приложения с мангой
        chrome.runtime.sendMessage({ action: 'openReader', id: mangaId, title: mangaTitle });
      } catch (error) {
        console.error('Ошибка при обработке клика по кнопке:', error);
      }
    });

    // Вставляем кнопку в блок
    infoRightBlock.appendChild(button);
  } catch (error) {
    console.error('Ошибка при добавлении кнопки:', error);
  }
} else {
  console.warn('Текущая страница не соответствует URL для манги.');
}
