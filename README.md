# Time-management app, like ToDoist
## [Deploy](https://omwi.github.io/)
## [Mock-up](https://www.figma.com/file/KJNqBirOFlj0bsaA3iY1ZW/Time-Management-App?node-id=0%3A1)
Приложение для создания todo листов. Возможность создания проектов, делящихся на секции в которые можно добавлять задачи
## Main functions
- Создание задач, секций, проектов
- Расставление приоритетов задач
- Удаление выполненных задач
- Перемещение задач между секциями
- Поиск
- Редактирование
## Data models
1. User - таблица данных пользователей
```sh
id
email
password
username
```
2. Task - таблица хранящая содержание задач
```sh
id
name
description
priority
section_id
project_id
```
3. Section - таблица секций
```sh
id
name
project_id
```
4. Project - таблица проектов 
```sh
id
name
user_id
```
