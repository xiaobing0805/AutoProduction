from django.shortcuts import render
from django.views.generic.base import View
from django.http import HttpResponse
from rest_framework.generics import ListAPIView

from .serializers import KafkaSerializer
from .models import kafkamessage


# def delivery_kafka(request):
#     return render(request,'sendkafka/send.html')

class DeliveryView(View):
    def get(self,request):
        all_host = kafkamessage.objects.all().order_by("-add_time")

        return render(request, 'sendkafka/send.html',{
            "all_host":all_host
        })

class MessageList(ListAPIView):
    queryset = kafkamessage.objects.all().order_by("-add_time")
    serializer_class = KafkaSerializer

class HostView(View):
    def get(self,request,pk):
        host = kafkamessage.objects.get(id=pk)
        return HttpResponse('{"host":"'+host.hosts+'","theme":"'+host.theme+'","code":"'+host.code+'"}',content_type='application/json')

