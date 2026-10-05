# 🏨 Hotel Rating Web Application

Современное веб-приложение для просмотра, оценки и бронирования отелей с интерактивным интерфейсом, системой рейтингов и личным кабинетом.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

---

## 🌟 Основные возможности

- **🏨 Каталог отелей:** Просмотр списка доступных отелей с динамической загрузкой данных через REST API.
- **⭐ Система рейтингов и отзывов:** Пользователи могут выставлять оценки и оставлять отзывы о сервисе и номерах.
- **👤 Авторизация и аутентификация:** Безопасный вход и регистрация пользователей с использованием JWT-токенов.
- **📱 Адаптивный UI/UX:** Полностью отзывчивый интерфейс, оптимизированный под мобильные устройства, планшеты и ПК.
- **⚡ Высокая скорость работы:** Мгновенная сборка и оптимизированный рендеринг благодаря Vite и Vue 3 Composition API.

---

## 🛠 Технологический стек

### Frontend
- **Framework:** Vue 3 (Options / Composition API)
- **State Management:** Vuex 4 (модульная архитектура)
- **Routing:** Vue Router (HTML5 History Mode)
- **Styling:** Tailwind CSS + PostCSS
- **HTTP Client:** Axios (с кастомными инстансами и перехватчиками)
- **Build Tool:** Vite

### Инфраструктура и деплой
- **Hosting:** Vercel
- **CI/CD:** Автоматический деплой при пуше в ветку `main`

---

## 📂 Структура проекта

```text
src/
├── api/          # Модули API-запросов (Auth, Rates)
├── assets/       # Статические ресурсы (картинки, глобальные стили)
├── components/   # Переиспользуемые Vue-компоненты (UI kit, модалки)
├── router/       # Конфигурация маршрутизации (Vue Router)
├── store/        # Глобальное состояние приложения (Vuex)
├── views/        # Страницы приложения
├── App.vue       # Корневой компонент
└── main.js       # Точка входа в приложение
