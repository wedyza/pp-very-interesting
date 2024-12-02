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
python3 -m venv env
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
python3 manage.py migrate
```

Запустить проект:

```
python3 manage.py runserver
```
