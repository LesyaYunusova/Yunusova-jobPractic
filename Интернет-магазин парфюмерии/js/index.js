document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.querySelector('.lightdark');
  const body = document.body;
  
  // Проверяем сохраненную тему в localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    updateThemeIcon('light');
  } else {
    updateThemeIcon('dark');
  }
  
  // Обработчик клика по кнопке смены темы
  themeToggleBtn.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    
    // Сохраняем выбор темы
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Обновляем иконку
    updateThemeIcon(isDark ? 'light' : 'dark');
  });
  
  // Функция для обновления иконки темы
  function updateThemeIcon(theme) {
    const img = themeToggleBtn.querySelector('img');
    if (theme === 'light') {
      img.src = "./images/index_icons/Antu_eclipse.svg.png";
      img.alt = "Переключить на светлую тему";
    } else {
      img.src = "./images/index_icons/Antu_eclipse.svg.png"; 
      img.alt = "Переключить на темную тему";
    }
  }
  
  // Остальной JavaScript код (для корзины и т.д.)
});