# Домашние задания по курсу «NDTNF - TypeScript, Nest.js, Firebase»

## Блок 1: TypeScript

Домашнее задание к занятию «1.3 IoС и DI. Библиотека reflect-metadata»

ТЗ доступно по [ссылке](https://github.com/netology-code/ndtnf-homeworks/tree/master/003-Ioc).


Запуск: 
1) Поместить в `./config/.local.env` настройки (пример файла: `.local.env.example`).
2) Запустить: `docker-compose --env-file ./config/.local.env up -d --build`
3) Приложение будет доступно по адресу `http://localhost:3000/`

Ссылки на файлы для быстрого перехода:
* container [ndse-library/app/boot/container.ts](ndse-library/app/boot/container.ts)
* интерфейс [BooksRepositoryInterface](ndse-library/app/services/Interfaces/BooksRepositoryInterface.ts)
* сервис [BooksService](ndse-library/app/services/BooksService.ts)
* реализация на mongo [BooksRepository](ndse-library/app/services/mongo/BooksRepository.ts)

