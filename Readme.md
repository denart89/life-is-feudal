Запуск проекта

```
gulp dev
npm run dev
```

Сборка проекта

```
gulp build
npm run build
```


SVG иконки лежат в спрайте `/img/sprite.svg` и не отображаются на странице после сборки, т.к. нужен сервер.
Отображение svg иконок локально после сборки:
1. Открыть `gulpfile.js`
2. Найти строку `baseDir: settings.baseDir`
3. Заменить `settings.baseDir` на `baseDir: settings.buildDir`
4. Выполнить `gulp dev` или `npm run dev` в консоли