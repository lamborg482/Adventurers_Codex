# 🐉 Adventurers Codex — цифровой инструмент Мастера D&D

**Adventurers Codex** — веб-приложение для управления настольной ролевой игрой Dungeons & Dragons.  
Помогает Мастеру вести бестиарий, управлять боевыми сценами и загружать готовых существ из открытых наборов данных.  
Проект создан в рамках учебной практики и продолжает развиваться как **личное портфолио fullstack-разработчика**.

### 🧪 Статус
![Status](https://img.shields.io/badge/status-core%20playable-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-Vue%203-%234FC08D)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)

---

## ⚔️ Возможности (текущая версия)

- 🔐 Регистрация и вход (JWT-токены)
- 📖 **Бестиарий** — создание, редактирование, удаление и фильтрация существ по типу, CR и имени
- ⚔️ **Боевое окно** — добавление участников, авто-инициатива, контроль здоровья, порядок хода
- 📦 **Наборы данных** — предзагруженные монстры из JSON (можно расширять)
- 🎲 **Бросок инициативы** для всей группы
- 🧠 Умные модальные окна для просмотра деталей и выбора существ
- 🖼️ Поддержка изображений существ
- 🗂️ Разделение ролей (игрок / мастер) — основа для дальнейшего расширения

> Часть «Игрок» находится в разработке — будет включать лист персонажа и инвентарь.

---

## 🛠️ Стек технологий

### Фронтенд
![Vue.js](https://img.shields.io/badge/Vue.js-3.4-%234FC08D?style=flat&logo=vue.js)
![Pinia](https://img.shields.io/badge/Pinia-2.1-%23ffd859)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.3-%234FC08D)
![Axios](https://img.shields.io/badge/Axios-1.6-%235E29FF)
![Vite](https://img.shields.io/badge/Vite-5.0-%23646CFF)

### Бэкенд
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-333333)
![JWT](https://img.shields.io/badge/JWT-auth-000000?logo=JSON%20web%20tokens)
![Alembic](https://img.shields.io/badge/Alembic-migrations-6C757D)

---


---

## 🚀 Запуск локально

### 1. Бэкенд (FastAPI + PostgreSQL)

**Требования:** Python 3.10+, PostgreSQL, pip, Git.

```bash
# Клонируем репозиторий
git clone https://github.com/lamborg482/adventurers-codex.git
cd adventurers-codex/backend

# Виртуальное окружение
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Зависимости
pip install -r requirements.txt
```


### Настройка БД:

## Создай базу данных PostgreSQL (например, adventurers_codex). 
## Создай файл .env в папке backend/ (или внеси в app/config.py):

```
DATABASE_URL=postgresql+asyncpg://postgres:yourpassword@localhost:5432/adventurers_codex
SECRET_KEY=любая_длинная_строка
```

## Запусти сервер:

```
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 2. Фронтенд (Vue 3)

```
cd ../frontend
npm install
npm run dev
```
Приложение откроется на http://localhost:5173.
CORS в main.py уже настроен на этот адрес.

---


---

### 🖼️ Скриншоты

## Главная страница
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 09 40 AM" src="https://github.com/user-attachments/assets/d8c7f7f9-24be-4318-abb1-2b0f3c4007d6" />

## Авторизация/Регистрация на сайте
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 10 08 AM" src="https://github.com/user-attachments/assets/28cfaab5-4b29-4c72-a2ea-8c6f9161c116" />

<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 10 43 AM" src="https://github.com/user-attachments/assets/66e18d4e-d918-413a-98b1-df1b32cc0cce" />

## Бестиарий мастера
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 10 56 AM" src="https://github.com/user-attachments/assets/c531e13e-d339-49c5-916b-49d3e925804c" />


## Боевое окно
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 11 15 AM" src="https://github.com/user-attachments/assets/945b30a6-3a63-4c41-b275-f102549616d0" />

<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 11 31 AM" src="https://github.com/user-attachments/assets/f9ae66e5-8938-4df9-b828-862f334bbc90" />

<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 11 38 AM" src="https://github.com/user-attachments/assets/9ce8c5a1-4416-4715-bade-873d07715356" />


## Создание / редактирование существа
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 13 07 AM" src="https://github.com/user-attachments/assets/443560ee-4b00-4331-92a9-97b0659b4b31" />
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 13 17 AM" src="https://github.com/user-attachments/assets/73ce6017-b595-4c4d-ae7e-d4fcf99cfa64" />



## Просмотр существа в бестиарии
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 12 49 AM" src="https://github.com/user-attachments/assets/75ab4914-1e9a-44fc-bdd8-7c29ebb2bacd" />



## Наборы данных (предзагруженные монстры)
<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 13 27 AM" src="https://github.com/user-attachments/assets/002627a0-bdb0-4f37-a1cc-af5a4c24fab6" />

<img width="1440" height="900" alt="Снимок экрана 2026-05-12 в 12 13 33 AM" src="https://github.com/user-attachments/assets/e14403a0-afd3-4447-bd68-673cb7a97367" />


---

### 🎯 Уникальные особенности
## Нешаблонная бизнес-логика — приложение для реальной ниши (НРИ), а не очередной TODO-лист.

## Сложное состояние — composables разделяют логику бестиария, боя, модалок, что приближено к продакшен-паттернам.

## Динамическая фильтрация и поиск — во вкладках «Бестиарий» и «Наборы данных».

## Контроль порядка хода — в боевом режиме с автосортировкой по инициативе и ручным листанием.

## Безопасность — хэширование паролей (bcrypt), JWT с коротким временем жизни, защищённые эндпоинты.

## Расширяемость — можно подгружать собственных существ через JSON-файлы.

---

### 🔜 Roadmap
## Личный кабинет игрока с интерактивным листом персонажа

## Инвентарь и заклинания

## Экспорт/синхронизация с внешними сервисами (D&D Beyond)

## Адаптивная вёрстка для планшетов и телефонов

## Деплой на продакшен (Vercel + Railway)

## Тесты (pytest, Vitest)

---

---

### 👤 Автор
## Тимур Морозов
## Frontend-разработчик (Vue.js / FastAPI)
## 📧 timurmorozov5@gmail.com
## 📞 +7 (949) 482-33-13
## 💬 Telegram: @Timur_Morozov_1
## 🐙 GitHub: lamborg482
