from datetime import datetime

from django.db import models

class kafkamessage(models.Model):
    hosts = models.CharField(max_length=128,verbose_name='主机名')
    theme = models.CharField(max_length=128,verbose_name='kafka主题')
    code = models.CharField(max_length=128,verbose_name='kafkacode')
    add_time = models.DateTimeField(default=datetime.now,verbose_name='添加时间')

    class Meta:
        verbose_name = 'kafka相关'
        verbose_name_plural = verbose_name