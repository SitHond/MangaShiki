// Проверяем, что мы на странице манги по наличию нужного класса
const mangaPageUrlPattern = /shikimori\.(me|one)\/mangas\/\d+/;
if (mangaPageUrlPattern.test(window.location.href)) {
  // Находим блок с классом "c-info-right"
  const infoRightBlock = document.querySelector('.c-info-right');
  
  if (infoRightBlock) {
    console.log('Блок найден:', infoRightBlock);
    
    // Создаем кнопку
    const button = document.createElement('button');
    button.innerText = 'Читать в приложении';
    button.style = 'padding: 10px; margin-top: 10px; background-color: #5a67d8; color: white; border: none; cursor: pointer;';
    
    // Добавляем обработчик клика по кнопке
    button.addEventListener('click', async () => {
      const mangaId = window.location.href.match(/\d+/)[0]; // Получаем ID манги из URL
      const mangaTitle = document.querySelector('h1').innerText; // Заголовок манги в теге h1
      
      try {
        const response = await fetch(`http://localhost:3000/manga/${mangaId}`); // Запрос к вашему серверу
        if (!response.ok) {
          // Если API недоступно или нет страниц
          throw new Error('API недоступно или нет страниц для этой манги');
        }
        
        const mangaData = await response.json();
        console.log('Данные манги:', mangaData);
        chrome.runtime.sendMessage({ action: 'openReader', id: mangaId, title: mangaTitle });
      } catch (error) {
        console.error('Ошибка при получении данных манги:', error);
        // Предложить пользователю ввести данные вручную
        const userInput = confirm('Не удалось получить данные манги. Хотите ввести данные вручную?');
        if (userInput) {
          const manualTitle = prompt('Введите название манги:', mangaTitle);
          const manualId = prompt('Введите ID манги:', mangaId);
          // Отправляем введенные данные на сервер
          const manualData = {
            id_Shiki: manualId,
            pages: 1, // Вы можете задать значение по умолчанию или запросить у пользователя
            url: '', // URL можно задать позже или запросить у пользователя
            author: 'пользователь' // Замените на имя пользователя, если это необходимо
          };

          try {
            const response = await fetch('http://localhost:3000/manga', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(manualData),
            });

            if (response.ok) {
              const result = await response.json();
              console.log('Данные успешно отправлены на сервер:', result);
            } else {
              console.error('Ошибка при отправке данных на сервер:', response.statusText);
            }
          } catch (error) {
            console.error('Ошибка при отправке данных:', error);
          }
        }
      }
    });
    
    // Вставляем кнопку в блок
    infoRightBlock.appendChild(button);
    console.log('Кнопка добавлена успешно');
  } else {
    console.error('Не удалось найти блок с классом "c-info-right".');
  }
} else {
  console.error('Текущая страница не соответствует URL для манги.');
}
