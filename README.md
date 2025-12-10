# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Admin panel & server (added)

1. Server for storing applications was added in `server/`.

- Start server:

```powershell
cd server; npm install
npm start
```

Server listens by default on `http://localhost:3001` and exposes API endpoints:

- `POST /api/applications` — создать заявку (передавайте JSON `{name, phone, direction}`)
- `GET /api/applications` — получить список (требуется заголовок `x-admin-pass: 301062Ki`)
- `PATCH /api/applications/:id` — обновить заявку (требуется заголовок `x-admin-pass: 301062Ki`)

2. В фронтенде:

- Модальное окно записи (`src/components/Modal.jsx`) теперь отправляет заявку на `/api/applications` и содержит селект с направлениями.
- Админ‑панель доступна при переходе по `/#admin`. Пароль для входа: `301062Ki`.

Если нужен деплой — лучше перенести сервер на хост с поддержкой Node.js или использовать облачное хранилище/формы.

## Режим без сервера (локально, для GitHub Pages)

Если вы не хотите запускать отдельный сервер, проект поддерживает «локальный режим»: при отсутствии backend все заявки сохраняются в `localStorage` браузера. Это удобно для сдачи проекта и хостинга на GitHub Pages (статический сайт).

- Запуск (только фронтенд):

```powershell
npm install
npm run dev
```

- Как это работает:
	- Отправка заявки в модальном окне попытается обратиться к `http://<ваш-хост>:3001`. Если сервер недоступен, заявка будет автоматически сохранена в `localStorage` и форма подтвердит отправку.
	- Админ-панель доступна по `/#admin`. Вход по паролю `301062Ki` (он проверяется в клиентском приложении). Если сервер недоступен, панель загрузит заявки из `localStorage`.
	- Ограничение: при таком режиме данные есть только в браузере, где было сделано сохранение. Для реального продакшна нужен сервер или база данных.

Это изменение позволяет сдавать проект как статический сайт и при этом демонстрировать работу формы и админ‑панели без сервера.

## Деплой на GitHub Pages (шаги)

1. Создайте репозиторий на GitHub и запушьте код.
2. Если у вас ветка с именем `main`, workflow автоматически соберёт и опубликует сайт на GitHub Pages (настройка добавлена в `.github/workflows/gh-pages.yml`).
3. Локально вы также можете выполнить быстрый деплой с помощью пакета `gh-pages`:

```powershell
npm install --save-dev gh-pages
npm run deploy
```

Примечание по `base` в `vite.config.js`:
- В нашем проекте `base` установлен в `./`, что позволяет сайту корректно работать и при относительных путях (GitHub Pages с подпапкой репозитория) и локально. Если вы хотите, поставьте `base: '/REPO_NAME/'` (замените `REPO_NAME` на имя вашего репозитория) — это иногда удобнее для однозначных путей.

Альтернативные хостинги (ещё проще):
- Vercel / Netlify / Cloudflare Pages — они автоматически собирают проект из репозитория и публикуют сайт (не требуется `gh-pages`). Просто подключите репозиторий и укажите команду сборки `npm run build` и папку для публикации `dist`.

Если под "bolt.new" вы имели в виду сервис вроде Vercel/Netlify/Surge — да, они тоже подходят и будут работать (статический сайт + localStorage fallback останется работающим).

