import string
import json
import time,datetime,uuid

import random
import requests

from utils.rnd import order_num,createPhone,rand_waybill,_time,_rnd,_rnd_PType,_rndName,_rnd_company,_rnd_addr

def new_order(WayBillNo):
    '''
    派件订单信息
    :return:
    '''
    tim = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    Slt = datetime.datetime.now() + datetime.timedelta(hours = 1)
    order_no = str("00" + order_num(24))
    phone = str(createPhone())

    origin_id = "CX" + Slt.strftime("%Y%m%d") + "00000" + order_num(3)
    Tim = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    Tip = str(int(time.mktime(time.strptime(Tim, "%Y-%m-%d %H:%M:%S"))))

    delivery_company = _rnd_company()
    delivery_addr = _rnd_addr()
    consignee_mobile = createPhone()


    content = '''{\"txid\": \"'''+order_no+'''\",\"timestamp\": '''+Tip+''',\"waybill\": {\"main_no\": \"'''+WayBillNo+'''\"},\"waybill_remark\": \"\",\"originate_info\": {\"contact\": \"派件1\",\"phone\": \"'''+consignee_mobile+'''\",\"mobile\": \"'''+consignee_mobile+'''\",\"company\": \"顺丰科技\",\"address_info\": {\"address\": \"广东省深圳市南山区软件产业基地1栋B座12楼\",\"location_code\": \"755-755Q\"}},\"destination_info\": {\"contact\": \"派件2\",
    \"phone\": \"'''+phone+'''\",\"mobile\": \"'''+phone+'''\",
    \"company\": \"腾讯科技\",\"address_info\": {\"address\": \"滨海大厦\",\"location_code\": \"755\"}},\"meta_weight\": 1.0,\"real_weight\": 1.0,\"consignee_emp_code\": \"948098\",\"level_of_service\": {\"provider\": \"SF\",\"product\": {\"code\": \"T4,C201,B1\"}},\"freight_fee\": {\"code\": \"1\",\"amt\": 10,
    \"pay_method\": \"3\",\"custid\": \"7550195458\",\"gather_zone_code\": \"755Q\",\"settlement_type_code\": \"2\",
    \"payment_change_type_code\": \"0\",\"currency_code\": \"CNY\",\"gather_emp_code\": \"948098\",\"biz_owner_zone_code\": \"755Q\",\"fee_amt_ind\": 1.0,\"fee_ind_type\": \"0\"},\"service_list\": [],\"cargo_list\": [{\"name\": \"iphone8\",\"uom\": \"台\",\"quantity\": 1,\"price\": 0.0}],\"attrs\": [{\"attr035\": \"B: 17,自有平台\",\"attr041\": \"T801,B1,C201\"}]}'''
    contents = json.dumps(content,ensure_ascii=False)
    message = '''{
            "order_no": "'''+WayBillNo+'''",
            "dept_code": "755",
            "order_no_type": "1",
            "origin_list":
                [
                    {
                    "data_type": "201",
                    "content": '''+contents+''',
                    "create_time": "'''+tim+'''"
                    }
                ]
    }'''
    return  bytes(message, encoding = "utf8")


def pickup_order(sgs_username):
    '''
    收件信息
    :param sgs_username:
    :return:
    '''
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
    delivery_tel = createPhone()
    delivery_mobile = createPhone()
    delivery_contact = _rndName()
    delivery_addr = _rnd_addr()
    delivery_company = _rnd_company()
    consignee_tel = createPhone()
    consignee_mobile = createPhone()
    consignee_contact = _rndName()
    consignee_addr = "南山区软件产业基地"
    consignee_company = "顺丰科技"
    dest_city_code = '755'
    product_type = _rnd_PType()
    waybill_no = ""
    employee_id = str(sgs_username)
    employee_tel = createPhone()
    makeup = '贵重物品，带箱子，带胶带。'
    originid = 'UCMP-ZX' + _rnd(12)

    message='''
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
         "custName": "'''+ delivery_contact +'''",
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
         "mailno": "",
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
    return bytes(message, encoding = "utf8")