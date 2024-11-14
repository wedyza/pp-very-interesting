from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class StatusCode(models.Model):
    title = models.CharField('Название', max_length=100)


class Category(models.Model):
    title = models.CharField('Тип тикета', max_length=100)


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


class Ticket(BaseTicket):
    # location = models.GeoIp... - пока что просто заглушка, потом интегрирую
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


class SupportTicket(BaseTicket):
    pass


class Notification(models.Model):
    text = models.CharField('Текст', max_length=128)
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
