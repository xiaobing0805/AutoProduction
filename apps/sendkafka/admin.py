from django.contrib import admin
from .models import kafkamessage

class KafkaAdmin(admin.ModelAdmin):
    list_display = ('hosts','theme','code',)

admin.site.register(kafkamessage,KafkaAdmin)
