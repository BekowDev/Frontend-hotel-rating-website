# QonaqÚı — Hotel Rating Website

Веб-приложение для поиска отелей и просмотра отзывов гостей.

## Проекты

- Frontend: [Frontend-hotel-rating-website](https://github.com/BekowDev/Frontend-hotel-rating-website)
- Backend API: [API-for-hotel-rating-website](https://github.com/BekowDev/API-for-hotel-rating-website)
- Live demo: [frontend-hotel-rating-website.vercel.app](https://frontend-hotel-rating-website.vercel.app/)

## Возможности

- просмотр и поиск отелей, сортировка результатов;
- страница отеля с описанием, фотографиями, рейтингом и отзывами;
- регистрация и вход через backend;
- гостевой режим для демонстрации без backend;
- создание и удаление демо-отзывов с оценкой от 1 до 5;
- сохранение демо-отзывов в браузере;
- адаптивный интерфейс и слайдер фотографий.

## Технологии

- Vue 3
- Vite
- Vue Router
- Vuex 4
- Axios
- Tailwind CSS
- Swiper

## Запуск локально

Требуется Node.js и npm.

```bash
npm install
npm run dev
```

Откройте адрес, указанный Vite в терминале (обычно `http://localhost:5173`).

## Подключение backend

Backend API расположен в репозитории [API-for-hotel-rating-website](https://github.com/BekowDev/API-for-hotel-rating-website). Перед запуском backend должен быть настроен и подключён к MongoDB.

Адрес API фронтенда задаётся в `src/api/index.js`. В текущей версии там указан локальный адрес разработчика; для работы с собственным backend замените его на адрес своего сервера с префиксом `/api`, например:

```js
const urls = "http://localhost:3000/api";
```

Порт должен соответствовать значению `PORT`, заданному при запуске backend.

## Гостевой режим

Для знакомства с интерфейсом без настройки backend:

1. Откройте страницу входа.
2. Нажмите **Continue as demo guest**.
3. Выберите отель и откройте отзывы.

Демо-отели и отзывы доступны локально. Демо-сессия действует до закрытия вкладки; добавленные демо-отзывы сохраняются в браузере.

## Сборка и предпросмотр

```bash
npm run build
npm run preview
```

## Деплой на Vercel

Проект собирается командой `npm run build`. Файл `vercel.json` перенаправляет SPA-маршруты на `index.html`, чтобы прямой переход и обновление страницы не приводили к ошибке 404.
