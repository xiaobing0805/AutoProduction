import string
import uuid
import json
import time
import datetime
import random
from pykafka import KafkaClient
import threading
import requests
# hosts_01 = "10.202.24.5:9094,10.202.24.6:9094,10.202.24.7:9094,10.202.24.8:9093,10.202.24.9:9094"
# client = KafkaClient(hosts_01)
# topic = client.topics[b"ENV3_SGSDIS_DELIVERY_ORDER_OMS"]
# # print(client.topics)
#
# def order_num(i):
#     return ''.join([random.choice(string.digits) for i in range(i) ])
#
# def createPhone():
#     '''
#     随机手机号
#     :return:
#     '''
#     prelist = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "147", "150", "151", "152", "153", "155", "156", "157", "158", "158", "159", "186", "187", "188"]
#     return random.choice(prelist) + "".join(random.choice("0123456789") for i in range(8))
#
# def rand_waybill():
#     '''
#     随机运单号
#     :return:
#     '''
#     a = [random.randint(0, len(string.digits) - 1) for _ in list(range(8))]
#     b = [x for x in range(0, 16) if x % 2 != 0]
#     c = list(map(lambda a,b: a* b, a, b))
#     rand4 = sum([int(c[i] / 10) + c[i] % 10 for i in list(range(8))])
#     e = (rand4 * 10 - rand4) % 10
#     a.reverse()
#     f = [str(x) for x in a]
#     waybill = ''.join(random.sample(string.digits, 3)) + ''.join(f) + str(e)
#     return waybill
#
# WayBillNo = rand_waybill()
#
# def new_order():
#     '''
#     订单信息
#     :return:
#     '''
#     tim = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
#     Slt = datetime.datetime.now() + datetime.timedelta(hours = 1)
#     order_no = str("00" + order_num(24))
#     #Slt.strftime("%Y%m%d")
#     origin_id = "CX" + Slt.strftime("%Y%m%d") + "00000" + order_num(3)
#     Tim = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
#     Tip = str(int(time.mktime(time.strptime(Tim, "%Y-%m-%d %H:%M:%S"))))
#     # waybillNO = rand_waybill()
#     # custid = "7550195458"/7550838063
#     # phone = 0755-36395774
#     # mobile = 18814330821
#     #结算方式settlementTypeCode：1、现结；2、月结
#     #支付方式paymentTypeCode：1、寄付；2、到付；3、转第三方
#     content = '''{\"txid\": \"'''+order_no+'''\",\"timestamp\": '''+Tip+''',\"waybill\": {\"main_no\": \"'''+WayBillNo+'''\"},\"waybill_remark\": \"\",\"originate_info\": {\"contact\": \"派件1\",\"phone\": \"'''+createPhone()+'''\",\"mobile\": \"'''+createPhone()+'''\",\"company\": \"顺丰科技\",\"address_info\": {\"address\": \"广东省深圳市南山区软件产业基地1栋B座12楼\",\"location_code\": \"755-755Q\"}},\"destination_info\": {\"contact\": \"派件2\",
#     \"phone\": \"qwertyu12345678~!@#$%^&*()_+)(\",\"mobile\": \"+_)(*&^%$#@!09876543zlkjhg\",
#     \"company\": \"腾讯科技\",\"address_info\": {\"address\": \"广东省深圳市宝安区海滨花园15栋\",\"location_code\": \"755\"}},\"meta_weight\": 1.0,\"real_weight\": 1.0,\"consignee_emp_code\": \"948098\",\"level_of_service\": {\"provider\": \"SF\",\"product\": {\"code\": \"T4,C201,B1\"}},\"freight_fee\": {\"code\": \"1\",\"amt\": 10,
#     \"pay_method\": \"3\",\"custid\": \"7550195458\",\"gather_zone_code\": \"755Q\","settlement_type_code\": \"2\",
#     \"payment_change_type_code\": \"0\",\"currency_code\": \"CNY\",\"gather_emp_code\": \"948098\",\"biz_owner_zone_code\": \"755Q\",\"fee_amt_ind\": 1.0,\"fee_ind_type\": \"0\"},\"service_list\": [],\"cargo_list\": [{\"name\": \"iphone8\",\"uom\": \"台\",\"quantity\": 1,\"price\": 0.0}],\"attrs\": [{\"attr035\": \"B: 17,自有平台\",\"attr041\": \"T801,B1,C201\"}]}'''
#     contents = json.dumps(content,ensure_ascii=False)
#     message = '''{
#             "order_no": "'''+WayBillNo+'''",
#             "dept_code": "755",
#             "order_no_type": "1",
#             "origin_list":
#                 [
#                     {
#                     "data_type": "201",
#                     "content": '''+contents+''',
#                     "create_time": "'''+tim+'''"
#                     }
#                 ]
#     }'''
#     return  bytes(message, encoding = "utf8")
#
# for producer in range(1):
#     with topic.get_sync_producer() as syncproducer:
#         syncproducer.produce(new_order(),partition_key=b"33E!!Xs4")

# 出仓接口
# urls = 'http://10.202.60.71:8931/express/warehouseKeeperScanServiceV2/takeout'
# datas = '{"targetEmpCode":"948249","waybillNo":"'+ WayBillNo +'","takeoutType":"TO_PERSON"}'
# header = {'Content-Type': 'application/json', 'sgs-username': '948249'}
# rr = requests.post(urls, datas, headers=header)

# 交接接口
# now_time = time.time()
# now_time_ms = str(((int(now_time))*1000))
# urls = 'http://10.202.60.199:8931/express/deliveryService/handover'
# datas = '{"operaTime":'+now_time_ms+',"waybills":["'+ WayBillNo +'"]}'
# header = {'Content-Type': 'application/json', 'sgs-username': '032620'}
# rr = requests.post(urls, datas, headers=header)

def _time():
    return (datetime.datetime.now()).strftime('%Y-%m-%d %H:%M:%S')
def _rnd(arg):
    return ''.join(str(x) for x in [random.randint(0, len(string.digits) - 1) for _ in range(arg)])
def _telephone():
    return "1"+"".join(random.choice("3578"))+"".join(random.sample(string.digits, 9))

def ReMsg(arg):
    # 参数
    trans_id = str(uuid.uuid4())
    trans_timestamp = _time()
    order_id = _rnd(26)
    job_id = _rnd(15)
    order_create_tm = _time()
    last_time = str((datetime.datetime.now() + datetime.timedelta(minutes=random.randint(60,120))).strftime('%H%M'))
    order_city_code = '010'
    pickup_Type = '9'
    order_dept_code = '010Y'
    order_dist_code = '755'
    delivery_tel = _telephone()
    delivery_mobile = _telephone()
    delivery_contact = "123"
    delivery_addr =  "123"
    # delivery_addr = '广州市新港西路152号'
    delivery_company =  "123"
    consignee_tel = _telephone()
    consignee_mobile = _telephone()
    consignee_contact =  "123"
    consignee_addr = "123"
    consignee_company =  "123"
    dest_city_code = '755'
    product_type = "T4"
    # waybill_no = Custom_WayBill('033')
    waybill_no = ""
    employee_id = '948249'
    employee_tel = _telephone()
    makeup = '贵重物品，带箱子，带胶带。'
    originid = 'UCMP-ZX' + _rnd(12)

    sendMessage='''
     {
         "trans_id": "'''+ trans_id +'''",
         "trans_timestamp": "'''+ trans_timestamp +'''",
         "msg_type": "1",
         "msg_source": "1",
         "tableid": "10",
         "optype": "I",
         "jobid": "'''+ job_id +'''",
         "orderid": "'''+ order_id +'''",
         "order_origin_source": "41",
         "empid": "'''+ employee_id +'''",
         "emptel": "'''+ delivery_tel +'''",
         "custid": "13812345678",
         "msg": "19004新:004:非:7550001431:顺丰速运:警:1701:沙头街道办新沙路60号:13812345678:::顺小丰:到方付::北京市:印:文件:1.0::|",
         "sendDate": "'''+ order_create_tm +'''",
         "sendTime": "'''+ order_create_tm +'''",
         "sendType": "1",
         "pickup_Type":"'''+ pickup_Type +'''",
         "lastTime": "'''+ last_time +'''",
         "operator": "7550001431",
         "deptid": "'''+ order_dept_code +'''",
         "resno": "'''+ order_city_code +'''",
         "compAbb": "顺丰速运",
         "custTel": "'''+ consignee_tel +'''",
         "custName": "'''+ arg.zfill(3)+'.'+ delivery_contact +'''",
         "originid": "'''+ originid +'''",
         "orderType": "41",
         "originalFee": "0",
         "senderType": "B",
         "jAddress": "'''+ delivery_addr +'''",
         "weight": "1",
         "dContanct": "'''+ consignee_contact +'''",
         "dTel": "'''+ consignee_mobile +'''",
         "dCompany": "'''+ delivery_company +'''",
         "dAddress": "'''+ consignee_addr +'''",
         "cargoName": "文件",
         "cargoNumber": "1",
         "payMethod": "2",
         "destinationCode": "010",
         "mailno": "'''+ waybill_no +'''",
         "productType": "T4",
         "productName": "顺丰次日/标准快递",
         "device": "IBM",
         "sp": "中国移动",
         "delivery_addr_lat": "0",
         "delivery_addr_lng": "0",
         "teamid": "755Y061",
         "is_hht_waybill": "1",
         "destDeptCode": "010EK",
         "destTransCode": "010WB",
         "hint": "E",
         "proName": "标准快递"
     }
    '''
    return bytes(sendMessage, encoding = "utf8")

def send_kafka_rec():
    # 收件任务
    client = KafkaClient(hosts="10.202.24.5:9093,10.202.24.6:9093,10.202.24.7:9093,10.202.24.8:9093,10.202.24.9:9093")
    # 主题名称
    topic = client.topics[b'CBS_SCH_ORDER_TO_SGS_MATCH']
    for i in range(1):
        sendMessage = ReMsg(str(i + 1))
        print(_time())

        with topic.get_sync_producer() as syncproducer:
            syncproducer.produce(sendMessage,partition_key=b"2^!S$aR8")



if __name__ == '__main__':
    send_kafka_rec()