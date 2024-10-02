chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openReader') {
      const { id, title } = message;
      // Получаем URL страницы расширения (например, index.html)
      const extensionUrl = chrome.runtime.getURL(`index.html?mangaId=${id}&title=${encodeURIComponent(title)}`);
      
      // Открываем страницу в новой вкладке
      chrome.tabs.create({ url: extensionUrl });
    }
  });
  