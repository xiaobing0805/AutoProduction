import string
import json
import time
import datetime
import random
import requests

import os,django
from django.http import HttpResponse,request
from pykafka import KafkaClient

from utils.kafka_message import new_order,rand_waybill,pickup_order
from utils.simple import ReMsg


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "niepan.settings")# project_name 项目名称
django.setup()


# def pickup():
    # 出仓接口
    # urls = 'http://10.202.60.71:8931/express/warehouseKeeperScanServiceV2/takeout'
    # datas = '{"targetEmpCode":"070000","waybillNo":"'+ WayBillNo +'","takeoutType":"TO_PERSON"}'
    # header = {'Content-Type': 'application/json', 'sgs-username': '070000'}
    # rr = requests.post(urls, datas, headers=header)


def zs_delivery(request):
    # 派件交接接口
    WayBillNo = rand_waybill()
    hosts = "10.202.24.5:9094,10.202.24.6:9094,10.202.24.7:9094,10.202.24.8:9094,10.202.24.9:9094"
    theme = "ENV3_SGSDIS_DELIVERY_ORDER_OMS"
    code = "33E!!Xs4"
    client = KafkaClient(hosts)
    topic = client.topics[bytes(theme,encoding="utf8")]
    for producer in range(1):
        with topic.get_sync_producer() as syncproducer:
            syncproducer.produce(new_order(WayBillNo),partition_key=bytes(code,encoding="utf8"))

    now_time = time.time()
    now_time_ms = str(((int(now_time))*1000))

    urls = 'http://10.202.60.199:8931/express/deliveryService/handover'
    datas = '{"operaTime":'+ now_time_ms +',"waybills":["'+ WayBillNo +'"]}'
    sgs_username = request.POST.get('sgs_username')
    header = {'Content-Type': 'application/json', 'sgs-username': sgs_username}
    request_delivery = requests.post(urls, datas, headers=header)
    return HttpResponse(request_delivery, content_type='application/json')


def pickup(request):
    # 收件任务
    sgs_username = request.POST.get('sgs_username')
    client = KafkaClient(hosts="10.202.24.5:9093,10.202.24.6:9093,10.202.24.7:9093,10.202.24.8:9093,10.202.24.9:9093")
    # 主题名称
    topic = client.topics[b'CBS_SCH_ORDER_TO_SGS_MATCH']
    for i in range(1):
        sendMessage = pickup_order(sgs_username)
        with topic.get_sync_producer() as syncproducer:
            syncproducer.produce(sendMessage,partition_key=b"2^!S$aR8")
    return HttpResponse('{"status":"OK!!!!!!!!!!"}', content_type='application/json')






