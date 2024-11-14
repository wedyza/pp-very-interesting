from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import (
    RegexValidator, MaxValueValidator, MinValueValidator
)


# class UserType(models.Model):
#     name = models.CharField('Название', max_length=100)

#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name = 'Тип пользователя'
#         verbose_name_plural = 'Типы пользователей'


class CustomAbstractUser(AbstractUser):
    first_name = models.CharField('Имя', max_length=40)
    last_name = models.CharField('Фамилия', max_length=40)
    avatar = models.ImageField()
    phone_regex = RegexValidator(
        regex=r'^+7\d{10}$',
        message='Номер телефона должен быть введен в формате +7XXXXXXXXXX.'
    )
    phone_number = models.CharField(
        'Номер телефона',
        validators=[phone_regex],
        max_length=12,
        unique=True
    )
    rating = models.IntegerField('Рейтинг', default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(10)
    ])
    # user_type = models.ForeignKey(
    #     UserType,
    #     verbose_name='Тип пользователя',
    #     on_delete=models.SET_DEFAULT,
    #     default=0
    # )
