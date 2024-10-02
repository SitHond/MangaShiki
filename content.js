// Проверяем, что мы на странице манги по наличию нужного класса
const mangaPageUrlPattern = /shikimori\.(me|one)\/mangas\/\d+/;
if (mangaPageUrlPattern.test(window.location.href)) {
  // Находим блок с классом "c-info-right"
  const infoRightBlock = document.querySelector('.c-info-right');
  
  if (infoRightBlock) {
    // Создаем кнопку
    const button = document.createElement('button');
    button.innerText = 'Читать в приложении';
    button.style = 'padding: 10px; margin-top: 10px; background-color: #5a67d8; color: white; border: none; cursor: pointer;';
    
    // Добавляем обработчик клика по кнопке
    button.addEventListener('click', () => {
      const mangaId = window.location.href.match(/\d+/)[0]; // Получаем ID манги из URL
      const mangaTitle = document.querySelector('h1').innerText; // Предположим, заголовок манги в теге h1
      chrome.runtime.sendMessage({ action: 'openReader', id: mangaId, title: mangaTitle });
    });
    
    // Вставляем кнопку в блок
    infoRightBlock.appendChild(button);
  }
}
