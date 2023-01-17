# Gendiff

Учебный проект, в рамках которого на javaScript реализуется утилита командной строки, сравнивающая содержимое двух тектовых фйалов.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/AlexanderRyzhov/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AlexanderRyzhov/frontend-project-46/actions)

### My-check tests and linter status:
[![my-check](https://github.com/AlexanderRyzhov/frontend-project-46/actions/workflows/my-check.yml/badge.svg)](https://github.com/AlexanderRyzhov/frontend-project-46/actions/workflows/my-check.yml)

### CodeClimate Maintainability status:
[![Maintainability](https://api.codeclimate.com/v1/badges/c9fed677ad0202ce62cd/maintainability)](https://codeclimate.com/github/AlexanderRyzhov/frontend-project-46/maintainability)

### CodeClimate Test Coverage:
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9fed677ad0202ce62cd/test_coverage)](https://codeclimate.com/github/AlexanderRyzhov/frontend-project-46/test_coverage)


# Системеые требования

- [Node.js](https://nodejs.org/en/) версии >= 13 - это платформа с открытым исходным кодом для работы с языком JavaScript, построенная на движке Chrome V8. Она позволяет писать серверный код для веб-приложений и динамических веб-страниц, а также программ командной строки.
- [commander >= 9.5.0](https://www.npmjs.com/package/commander) - библиотека для создания интерфейсов командной строки на Node.js
- [JS-YAML](https://github.com/nodeca/js-yaml) - парсер YAML
- [lodash](https://lodash.com/) - библиотека, с набором полезных функций, для работы с данными


для разрабтки используются следующие утилиты и сервисы:

- утилита `make` и `Makefile`
- [Eslint](https://eslint.org/) - программа, отвечающие за проверку кода на соответствие стандартам + стандарт [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [CodeClimate](https://codeclimate.com/) - онлайн-сервис оценки качества кода

# Инструкция по разворачиванию проекта

- склонировать репозиторий проекта
- в дирректории проекта запустить команду `make insall` для установки зависимостей
- установить пакет в систему с помощью `npm link`, может потребовать запуск с `sudo`
- убедиться в том, что проект развернут успешно, запустив команду `gendiff` в терминале

### Пример запуска утилиты (сравнение "плоских" json файлов)
[![asciicast](https://asciinema.org/a/Ah8stva6NBcen1a4jGcwqttEB.svg)](https://asciinema.org/a/Ah8stva6NBcen1a4jGcwqttEB)

### Пример запуска утилиты (сравнение "плоских" yaml файлов)
[![asciicast](https://asciinema.org/a/bQfLsIQ2TT86dqAKh7cytQUyi.svg)](https://asciinema.org/a/bQfLsIQ2TT86dqAKh7cytQUyi)

### Пример запуска утилиты (сравнение json файлов с вложенными структурами) с выводом результатов в формате stylish
[![asciicast](https://asciinema.org/a/3sEz9pgBRZZaRZIxKff5eLUET.svg)](https://asciinema.org/a/3sEz9pgBRZZaRZIxKff5eLUET)

### Пример запуска утилиты (сравнение json файлов с вложенными структурами) с выводом результатов в формате plain
[![asciicast](https://asciinema.org/a/OvG8ob82lZ812TLOzeHLdZPN4.svg)](https://asciinema.org/a/OvG8ob82lZ812TLOzeHLdZPN4)

### Пример запуска утилиты (сравнение json файлов с вложенными структурами) с выводом результатов в формате json
[![asciicast](https://asciinema.org/a/KEWXtmVG7d3gOOyu96AzGCb2B.svg)](https://asciinema.org/a/KEWXtmVG7d3gOOyu96AzGCb2B)