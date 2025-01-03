from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import (
    RegexValidator, MaxValueValidator, MinValueValidator
)
from django.utils import timezone


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, phone_number, password, first_name=None, last_name=None, **extra_fields):
        if not phone_number:
            raise ValueError('Должен быть номер телефона')
        self.phone_number = phone_number
        user = self.model(phone_number=phone_number, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, phone_number, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(phone_number, password, first_name, last_name, **extra_fields)

    def create_superuser(self, phone_number, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(phone_number, password, **extra_fields)


# class UserType(models.Model):
#     name = models.CharField('Название', max_length=100)

#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name = 'Тип пользователя'
#         verbose_name_plural = 'Типы пользователей'


class CustomAbstractUser(AbstractUser):
    username = None
    USERNAME_FIELD = 'phone_number'
    objects = UserManager()
    REQUIRED_FIELDS = ['first_name', 'last_name']

    first_name = models.CharField('Имя', max_length=40) 
    last_name = models.CharField('Фамилия', max_length=40)
    given_name = models.CharField('Отчество', max_length=40, null=True)
    avatar = models.ImageField(null=True, upload_to='users/avatars/')
    phone_regex = RegexValidator(
        regex=r'^\+7\d{10}$',
        message='Номер телефона должен быть введен в формате +7XXXXXXXXXX.'
    )
    phone_number = models.CharField(
        'Номер телефона',
        validators=[phone_regex],
        max_length=12,
        unique=True
    )
    rating = models.FloatField('Рейтинг', default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(10)
    ])

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    # user_type = models.ForeignKey(
    #     UserType,
    #     verbose_name='Тип пользователя',
    #     on_delete=models.SET_DEFAULT,
    #     default=0
    # )

class ModeratorSetuped(models.Model):
    user = models.ForeignKey(
        CustomAbstractUser,
        related_name='Пользователь',
        on_delete=models.CASCADE
    )
    admin = models.ForeignKey(
        CustomAbstractUser,
        related_name='Админ',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(default=timezone.now())