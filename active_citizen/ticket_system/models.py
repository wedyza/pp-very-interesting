from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class StatusCode(models.Model):
    title = models.CharField('Название', max_length=100)

    class Meta:
        verbose_name = 'Код статуса'
        verbose_name_plural = 'Коды статусов'

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField('Тип тикета', max_length=100)
    description = models.CharField('Описание', max_length=500)
    # source = models.ImageField('Изображение', null=True)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class SubCategory(models.Model):
    title = models.CharField('Тип тикета', max_length=100)
    description = models.CharField('Описание', max_length=500)
    source = models.ImageField('Изображение')
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'


class BaseTicket(models.Model):
    body = models.TextField('Тело')
    title = models.CharField('Заголовок', max_length=100)
    created_at = models.DateTimeField('Создано', auto_now_add=True)
    status_code = models.ForeignKey(
        StatusCode,
        on_delete=models.SET_DEFAULT,
        verbose_name='Статус',
        default=0
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True
    )

    class Meta:
        abstract = True


class Media(models.Model):
    source = models.ImageField('Изображение')

    class Meta:
        verbose_name = 'Медиа'
        verbose_name_plural = 'Медиа'


class Ticket(BaseTicket):
    address = models.CharField(
        'Адрес проблемы',
        null=True,
        max_length=100
    )
    time = models.DateTimeField(
        'Время проишествия',
        null=True
    )
    edited = models.BooleanField(
        'Редактировано',
        default=False
    )
    media = models.ManyToManyField(
        Media,
        verbose_name='Медиа',
        null=True
    )

    class Meta:
        verbose_name = 'Тикет'
        verbose_name_plural = 'Тикеты'


class SupportTicket(BaseTicket):
    pass

    class Meta:
        verbose_name = 'Тикет поддержки'
        verbose_name_plural = 'Тикеты поддержки'


class Notification(models.Model):
    is_read = models.BooleanField('Прочитано', default=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    ticket = models.ForeignKey(
        Ticket,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField('Создано', auto_now_add=True)
    status_code_changed_on = models.ForeignKey(
        StatusCode,
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Уведомление'
        verbose_name_plural = 'Уведомления'


class Comment(models.Model):
    body = models.TextField('Тело комментария')
    ticket = models.ForeignKey(
        Ticket,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
