# Поиск Сотрудников

Это одностраничное приложение (SPA), созданное с использованием React, которое позволяет пользователям искать сотрудников и просматривать их профили. Приложение использует API JSONPlaceholder для получения данных о пользователях. Основные возможности приложения включают боковую панель поиска и отображение профилей пользователей.

## Особенности

- Поиск сотрудников по ID, имени пользователя или имени
- Отображение профилей сотрудников с личными данными
- Обработка ошибок при неверных запросах или ошибках на стороне сервера
- Индикаторы загрузки во время запросов к API
- Использование SCSS для стилей
- Изолированные стили для компонентов с помощью БЭМ методологии
- Адаптивный дизайн с использованием шрифта Montserrat

## Учесть при выполнении ТЗ:
1. Можно искать, как одного пользователя, так и нескольких (допустим Bret, 	Antonette).

  - реализованно с помощью helper функции - `searchUserBy`

2. Поиск должен работать по полю id и полю username либо name, на ваше усмотрение.

  - так же реализованно с помощью helper функции - `searchUserBy`

3. При выборе способа получения пользователя(пользователей) и фильтрации учитывать, что их может быть больше 2000 человек.

  - реализовал infinity scroll на этот случай, можно написать в инпут "a,b,c,d,e"(максимум апи предоставляет 10 пользователь) и проверить как оно работает. Ограничение стоит на получение 4 юзеров.

4. При изменении состояния в sidebar, страница с профилем пользователя должна менять свое состояние, т.е если открыт профиль пользователя и потом решили удалить все из строки поиска, очищается список найденных пользователей, и страница отображения профиля возвращается в исходное состояние.

  - реализованно с помощью хука от `react-router-dom`  `useNavigate` на onChange input.


## Кастомный хук useDebounce

В приложении использован кастомный хук `useDebounce`, который помогает оптимизировать запросы, чтобы они не отправлялись на каждую введенную букву в поисковую строку.

## Начало работы

Чтобы получить локальную копию и начать работу, выполните следующие шаги:

1. Клонируйте репозиторий
2. Запустите `npm install`, чтобы установить необходимые зависимости
3. Используйте `npm run serve` для запуска сервера разработки
4. Откройте браузер и перейдите по адресу `http://localhost:8080/` (или указанному порту)

## Зависимости

- React
- Axios
- SCSS
