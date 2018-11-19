from rest_framework.serializers import ModelSerializer

from .models import kafkamessage

class KafkaSerializer(ModelSerializer):
    '''
    kafka信息
    '''
    class Meta:
        model = kafkamessage
        fields = ('theme','code')
