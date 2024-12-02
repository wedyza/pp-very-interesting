### Как запустить проект:

Клонировать репозиторий и перейти в него в командной строке:

```
https://github.com/wedyza/pp-very-interesting.git
```

```
cd pp-very-interesting
```

Сменить ветку на нужную
```
git branch backend
```

Cоздать и активировать виртуальное окружение:

```
py -m venv env
```

```
source env/Scripts/activate
```

Установить зависимости из файла requirements.txt:

```
pip install -r requirements.txt
```

Выполнить миграции:

```
py manage.py migrate
```

Запустить проект:

```
py manage.py runserver
```
