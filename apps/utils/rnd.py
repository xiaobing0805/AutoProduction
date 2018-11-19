import string
import json
import time,datetime,uuid

import random
import requests

def order_num(i):
    return ''.join([random.choice(string.digits) for i in range(i) ])

def createPhone():
    '''
    随机手机号
    :return:
    '''
    prelist = ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "147", "150", "151", "152", "153", "155", "156", "157", "158", "158", "159", "186", "187", "188"]
    return random.choice(prelist) + "".join(random.choice("0123456789") for i in range(8))

def rand_waybill():
    '''
    随机运单号
    :return:
    '''
    a = [random.randint(0, len(string.digits) - 1) for _ in list(range(8))]
    b = [x for x in range(0, 16) if x % 2 != 0]
    c = list(map(lambda a,b: a* b, a, b))
    rand4 = sum([int(c[i] / 10) + c[i] % 10 for i in list(range(8))])
    e = (rand4 * 10 - rand4) % 10
    a.reverse()
    f = [str(x) for x in a]
    waybill = ''.join(random.sample(string.digits, 3)) + ''.join(f) + str(e)
    return waybill

def _time():
    '''获取当前时间'''
    return (datetime.datetime.now()).strftime('%Y-%m-%d %H:%M:%S')

def _rnd(arg):
    '''随机订单内容'''
    return ''.join(str(x) for x in [random.randint(0, len(string.digits) - 1) for _ in range(arg)])

def _rnd_PType():
    '''时效类型'''
    return random.choice(['T4','T2','T8'])

def _rndName():
    '''随机名字'''
    friN = ['赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨','朱','秦','尤','许','何','吕','施','张','孔','曹','严','华','金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭','郎','鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳','酆','鲍','史','唐','费','廉','岑','薛','雷','贺','倪','汤','滕','殷','罗','毕','郝','邬','安','常','乐','于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和','穆','萧','尹','姚','邵','湛','汪','祁','毛','禹','狄','米','贝','明','臧','计','伏','成','戴','谈','宋','茅','庞','熊','纪','舒','屈','项','祝','董','梁','杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江','童','颜','郭','梅','盛','林','刁','钟','徐','邱','骆','高','夏','蔡','田','樊','胡','凌','霍','虞','万','支','柯','昝','管','卢','莫','经','房','裘','缪','干','解','应','宗','丁','宣','贲','邓','郁','单','杭','洪','包','诸','左','石','崔','吉','钮','龚','程','嵇','邢','滑','裴','陆','荣','翁','荀','羊','於','惠','甄','曲','家','封','芮','羿','储','靳','汲','邴','糜','松','井','段','富','巫','乌','焦','巴','弓','牧','隗','山','谷','车','侯','宓','蓬','全','郗','班','仰','秋','仲','伊','宫','宁','仇','栾','暴','甘','钭','厉','戎','祖','武','符','刘','景','詹','束','龙','叶','幸','司','韶','郜','黎','蓟','薄','印','宿','白','怀','蒲','邰','从','鄂','索','咸','籍','赖','卓','蔺','屠','蒙','池','乔','阴','郁','胥','能','苍','双','闻','莘','党','翟','谭','贡','劳','逄','姬','申','扶','堵','冉','宰','郦','雍','却','璩','桑','桂','濮','牛','寿','通','边','扈','燕','冀','郏','浦','尚','农','温','别','庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾','鱼','容','向','古','易','慎','戈','廖','庾','终','暨','居','衡','步','都','耿','满','弘','匡','国','文','寇','广','禄','阙','东','欧','殳','沃','利','蔚','越','夔','隆','师','巩','厍','聂','晁','勾','敖','融','冷','訾','辛','阚','那','简','饶','空','曾','毋','沙','乜','养','鞠','须','丰','巢','关','蒯','相','查','后','荆','红','游','竺','权','逯','盖','益','桓','公','万俟','司马','上官','欧阳','夏侯','诸葛','闻人','东方','赫连','皇甫','尉迟','公羊','澹台','公冶','宗政','濮阳','淳于','单于','太叔','申屠','公孙','仲孙','轩辕','令狐','钟离','宇文','长孙','慕容','鲜于','闾丘','司徒','司空','丌官','司寇','仉','督','子车','颛孙','端木','巫马','公西','漆雕','乐正','壤驷','公良','拓跋','夹谷','宰父','谷梁','晋','楚','闫','法汝','鄢','涂','钦','段干','百里','东郭','南门','呼延','归','海','羊舌','微生','岳','帅','缑','亢况','郈','有','琴','梁丘','左丘','东门','西门','商','牟','佘','佴伯','赏','南宫','墨','哈','谯','笪年','爱','阳','佟','第五','言','福']
    midN = ['梓','诗','可','雨','一','晨','欣','子','宇','俊','博','语','梦','亦','艺','秀','芳','靖','静','婷','斌','彬','浩','娇','巧','晓','纯','毕','莲','彩','心','红','鸿','馨','曦','妮','茹','荟','莉','志','少','文','义','立','银','翠','春','敏','花','霞','鹏','秋','理','霏','卫','莹','尚','琳','剑','季','玲','丽','嫣','德','达','舜','清','兴','青','新','铭','璋','艳','娟','玉','金','晋','素','梅','如','琼','小','步','霖','昌','萌','琴','仲','冉','笑','娅','双','雅','妍','润','姝','海','琰','昱','卉','泽','爱','连','葶','蔓','婧','蓉','林','沁','传','寄','活','汶','成','楚','怡','开','信','露','槐','思','宝','业','熙','夕','希','西','建','苇','皓','冬','永','咏','映','朱','助','祝','株','诸','竹','黄','祖','悦','杪','淑','书','殊','燕','倩','娜','舒','晗','忠','绮','云','纪','孝','铧','薇','泰','佩','澄','君','九','妙','慕','友','娥','荥','贤','武','芬','广','枫','元','瑜','韵','家','荣','芸','言','颢','利','筱','洁','媛','仁','坤','维','榜','恒','丹','绪','桃','旭','胜','圾','曙','艾','陈','蔚','贵','雷','寅','珂','宁','碧','婕','研','迎','景','潇','飘','雪','晰','松','力','莺','炜','曼','钥','嘉','天','中','加','军','偌','月','钰','璐','洪','昊','颖','仙','芝','相','婵','则','伟']
    lasN = ['骞','璺','薹','萍','潆','瀛','琳','嘤','丽','文','琴','茹','儿','秀','婷','红','颖','瑶','玉','洁','嫣','娅','菁','蓉','媛','莉','茜','晨','梅','妍','锌','莹','芳','彤','怡','莲','倩','渤','英','燕','雪','娟','蔺','清','玲','娜','婧','悦','美','晔','蔚','哲','琼','燃','玟','佳','艳','芬','冉','瑛','果','霞','迪','人','琛','雯','仪','灵','昕','馨','桂','熹','毓','泓','拉','娥','容','肜','铆','沁','华','叶','匕','包','褒','妤','傧','依','匝 ','杞 ','萍 ','妍 ','梅 ','娟 ','琼 ','花 ','燕 ','文 ','霞 ','红 ','琴 ','英 ','怡 ','悦 ','瑶 ','波 ','轩 ','莹 ','娜 ','洁 ','枚 ','媚 ','湄 ','朗 ','烛 ','华 ','颖 ','芬 ','云 ','昭 ','琳 ','玲 ','美 ','嫣 ','秀 ','芳 ','娥 ','阳 ','茹 ','媛 ','筠','梦','旎','敏','卿','萱','妩','菊','逸','彦','艺','穗','莛','花','童','竹','吉','妃','泽','青','梓','琪','晗','古','村','婵','墨','如','月','南','妹','函','希']
    f = random.choice(friN)
    m = random.choice(midN)
    l = random.choice(lasN)
    n = random.choice("123")
    if int(n) == 1:
        return f + m + m
    elif int(n) == 2:
        return f + m
    else:
        return f + m + l

def _rnd_company():
    '''
    随机公司，收录世界500强一部分
    '''
    companys = [u'中国石油化工集团公司',u'国家电网公司',u'中国工商银行',u'中国建设银行',u'鸿海精密工业股份有限公司',u'中国建筑股份有限公司',u'中国移动通信集团公司',u'上海汽车集团股份有限公司',u'中国铁路工程总公司',u'中国海洋石油总公司',u'来宝集团',u'中国铁道建筑总公司',u'国家开发银行',u'中国人寿保险(集团)公司',u'中国平安保险(集团)股份有限公司',u'中国中化集团公司',u'中国第一汽车集团公司',u'东风汽车集团',u'中国南方电网有限责任公司',u'中国华润总公司',u'中国邮政集团公司',u'中国兵器工业集团公司',u'天津市物资集团总公司',u'太平洋建设集团',u'中国航空工业集团公司',u'中国电信集团公司',u'中国交通建设集团有限公司',u'中国人民保险集团股份有限公司',u'中国中信集团有限公司',u'交通银行',u'神华集团']
    company = random.choice(companys)
    return company


def _rnd_addr():
    '''随机地址'''
    addrs = [ u'湖南省长沙市麓山南路932号', u'湖南省长沙市岳麓山', u'湖南省长沙市(雨花区)万家丽南路2段960号', u'湖南省长沙市岳麓区麓山南路', u'湖南省湘潭市桃源路',
             u'湖南省湘潭市雨湖区羊牯塘', u'张家界市永定区120号', u'中国湖南衡阳常胜西路28号', u'湖南省株洲市天元区泰山西路', u'湖南省长沙市芙蓉区', u'湖南省长沙市岳麓区含浦科教园',
             u'湖南省长沙市望城区丁字镇中', u'长沙市开福区洪山路98号', u'益阳市益阳大道西238号', u'湖南市湘潭市岳瑭区书院路17号', u'湖南省岳阳市学院路',
             u'湖南省长沙市岳麓区望城坡雷锋大道', u'湖南省衡阳市黄白路165号', u'湖南省郴州市王仙岭生态公园东', u'湖南省长沙市岳麓区高新技术产业开发区麓谷园',
             u'湖南省长沙市岳麓区岳麓区望城坡岳麓大道', u'湖南省常德市洞庭大道西段170号', u'湖南怀化市迎丰东路612号', u'湖南省永州市零陵区杨梓塘路130号', u'湖南省邵阳市大祥区',
             u'湖南省娄底市娄星区氐星路', u'湖南省衡阳市珠晖区衡花路18号', u'长沙市岳麓区枫林三路1015号', u'湖南省长沙市中意一路160号', u'长沙市岳麓区枫林二路139号',
             u'湖南省长沙市长沙县远大三路9号', u'湖南省怀化市锦溪南路148号', u'湖南省株洲市高家坳', u'湖南省邵阳市宝庆西路18号', u'湖南省益阳市银城南路',
             u'湖南省株洲市天元区泰山路51号', u'湖南省长沙市雨花区中意一路324号', u'湖南省湘潭市雨湖区', u'湖南省衡阳市石鼓区', u'湖南省长沙市远大二路1575号',
             u'湖南省长沙市万家丽北路土桥304号', u'长沙市岳麓区雷锋大道288号', u'湖南长沙干杉湖南交通职业技术学院', u'湖南长沙市中意路324号', u'湖宁乡县望城县雷锋镇',
             u'湖南省长沙市隆平高科技园', u'湖南省株洲市建设中路171号', u'湖南省长沙市岳麓区麓山南路153号', u'株洲市田心大道18号', u'湖南省湘潭市雨湖区',
             u'湖南省长沙市星沙经济开发区特立路5号', u'湖南省长沙市水渡河黄土岭', u'湖南省长沙市远大二路泉塘', u'湖南省常德市桥南玉霞大道', u'湖南省永州市冷水滩区永州大道2号',
             u'湖南省湘潭市九华经济开发区宝马西路湖', u'湖南省长沙市天心区望岳村48号', u'湖南省岳阳市云溪区长炼', u'湖南省株洲市石峰区清石路', u'湖南省湘潭市岳塘区书院路42号',
             u'湖南省湘潭市岳塘区下摄司街2号', u'湖南省长沙(星沙)经济技术开发区毛塘环保小区', u'湖南省衡阳市蒸湘区呆鹰岭镇', u'湖南省湘潭市河东大道10号', u'湖南省衡阳市珠晖区一环东路南九号',
             u'湖南省益阳市栖霞路135号', u'湖南长沙青园路168号', u'湖南省长沙市芙蓉区远大二路1069号', u'长沙市开福区万家丽北路一段359号', u'长沙市雨花区体院北路71号',
             u'湖南省岳阳市学院路', u'湖南省长沙市万家丽北路水渡河', u'湖南省长沙市雨花区井湾路784号', u'湖南省长沙市远大三路国际空港工业园', u'湖南常德汉寿县太子庙',
             u'湖南省衡阳市石鼓区松木塘', u'湖南省湘潭市九华经济区', u'湖南省株洲市大坪路18号', u'湖南省株洲市云龙示范区盘龙路88号', u'湖南省长沙市雨花区体院路510号',
             u'长沙市长沙县榔梨工业园', u'长沙市雨花区体院北路348号', u'湖南省长沙市雨花区香樟路22号', u'湖南省长沙市经济技术开发区盼盼路', u'湖南省长沙市星沙徐特立路9号',
             u'湖南省长沙市井圭路10号', u'湖南省长沙市天心区韶山路118', u'湖南省长沙市岳麓区含铺科教园', u'湖南省长沙市天心区南湖路沙湖街128号', u'湖南省长沙市雨花区香樟路22号',
             u'湖南省长沙市星沙经济技术开发区灰埠路87号', u'湖南省张家界市永定区解放路38号', u'湖南省衡阳珠晖区狮山路20号', u'湖南省吉首市杨家坪2号', u'湖南永州市零陵区南津北路338号',
             u'湖南株洲市红旗北路476号', u'湖南省娄底市经济技术开发区', u'湖南省怀化市鹤城区河西开发区', u'湖南省岳阳市学院路', u'湖南省常德市人民路4253号',
             u'湖南省长沙市中豹塘路196号', u'湖南省益阳市资阳区迎风桥', u'湖南省邵阳市大祥区梅子井',u'北京市海淀区颐和园路5号', u'北京市海淀区中关村大街59号', u'北京市海淀区清华大学', u'北京市海淀区上园村3号北京交通大学信息中心', u'北京市海淀区学院路30号',
             u'北京市昌平区府学路18号', u'北京市海淀区学院路丁11号', u'北京市海淀区学院路29号', u'北京市西土城路10号', u'北京市昌平区朱辛庄北农路2号',
             u'北京市朝阳区北三环东路15号', u'海淀区清华东路17号', u'北京市海淀区清华东路35号', u'北京市朝阳区北三环东路11号', u'北京市新街口外大街19号',
             u'北京市海淀区西三环北路2号',  u'北京市北四环东路97号', u'北京市朝阳区平乐园100号', u'北京石景山区晋元庄路5号', u'北京市右安门外西头条10号',
             u'北京市西三环北路105号', u'北京市丰台区花乡张家路口121号', u'北京朝阳区定福庄东街一号', u'北京市海淀区坡上村12号', u'北京朝阳区花家地南街8号',
             u'北京市东城区东棉花胡同39号', u'北京市海淀区聂各庄东路10号', u'北京昌平中关村科技园区创新路20号', u'北京市海淀区双清路一号',
             u'北京市丰台区马家堡东里8号', u'天津市红桥区竹山路7号', u'天津海河教育园区雅观路3号', u'天津轻工职业技术学院', u'天津市北辰区洛河道2号',
             u'天津市滨海新区唐沪庐山道1101号', u'天津市大港区三号院', u'天津市北辰区205国道1号', u'天津市大港区三号院幸福路51号', u'天津海河教育园区雅深路4号',
             u'天津市北辰区龙泉道2889号', u'天津市西青区东姜井凯苑路148号', u'天津国土资源和房屋职业学院', u'天津市河西区绍兴道海运里', u'天津市海河教育园区雅深路2号', u'天津团泊洼',
             u'天津市河东区娄山道27号', u'辽宁省大连市甘井子区软件园路8号', u'辽宁省锦州市凌河区松坡路3段40号', u'辽宁省沈阳市黄河北大街146号',
             u'辽宁省鞍山市铁东区平安街43号', u'辽宁大连旅顺南路西段6号', u'辽宁省兴城市高教园区', u'沈阳市苏家屯区金钱松东路36号', u'辽宁省沈阳市和平区三好街19号',
             u'沈阳市浑南新区文汇街18号', u'辽宁省大连开发区东北大街92号', u'辽宁省丹东市振安区临江后街116号', u'大连市旅顺经济开发区顺乐街33号', u'大连市旅顺口区经济开发区滨港路',
             u'辽宁省沈阳市东陵区泗水街', u'沈阳市沈北新区虎石台建设南一路5号', u'辽宁省铁岭市凡河新区黑龙江路45号', u'锦州市凌河区松坡路189号', u'辽宁省抚顺市顺城区高山路17号',
             u'辽宁朝阳双塔区凌河街四段219号', u'大连市甘井子区营平路260号', u'辽宁省大连市沙河口区由家路25号', u'辽宁省阜新市海州区育红路36号', u'辽宁省大连市甘井子区夏泊路100号',
             u'辽宁省抚顺市顺城区新城路(东段)7号', u'辽宁省营口市金牛山大街东14号', u'辽宁营口经济技术开发区', u'大连市甘井子区虹港路381号', u'辽宁省盘锦市兴隆台区惠宾大街119号',
             u'辽宁葫芦岛市龙港区海星路29号', u'辽宁省辽阳市铁西路150号', u'辽宁省辽阳市白塔区青年街26号', u'沈阳市沈北新区虎石台建设南一路', u'辽宁省锦州市古塔区',
             u'辽宁省沈阳市新城子区虎石台镇', u'锦州经济技术开发区西海路东段2号', u'辽宁省丹东市振兴区洋河大街30号', u'辽宁省锦州市凌河区松坡里129号', u'辽宁省辽阳市白塔区青年大街24号',
             u'辽宁省沈阳市于洪区沈北大学城', u'沈阳市东陵区浑南三路18号', u'沈阳市铁西区兴华南街51-2号', u'辽宁省大连市甘井子区红旗西路600号', u'大连开发区铁山西路',
             u'沈阳市东陵区东大营街11号', u'大连市甘井子区营城子镇大黑石旅游度假村', u'辽宁省丹东市振兴区地质路', u'沈阳市沈北新区蒲河新城裕农路70号', u'辽宁省铁岭市银州区岭东街一委',
             u'沈阳市苏家屯区枫杨路186号', u'辽宁省大连市金州新区大魏家魏兴路66号', u'辽宁省大连市甘井子区华北路北市商贸街158号', u'沈阳市沈北新区蒲河新城通顺街81号',
             u'大连市旅顺经济开发区金昌街1号', u'沈阳市沈北新区沈北路30号', u'辽宁省沈阳市大东区和睦路12号', u'辽宁省盘锦市盘山甜水', u'沈阳市沈北新区虎石台开发区蒲硕路88号',
             u'辽宁省铁岭市新城区鸭绿江路18号', u'辽宁省本溪市平山区环山路60', u'辽宁省铁岭市凡河新区教育园区', u'辽宁省沈阳市苏家屯区乔松路2号', u'辽宁省沈阳市沈北新区沈北路53号',
             u'沈阳市东陵区东陵东路82号', u'长春市前进大街2699号', u'吉林省长春市人民大街5268号', u'吉林省延吉市公园路977号', u'吉林省吉林市龙潭区新山街一号',
             u'长春市卫星路6543号', u'中国吉林省长春市卫星路7089号', u'长春市修正路229号', u'长春市二道区新城大街2888号', u'长春市净月经济开发区博硕路1035号',
             u'吉林省四平市铁西区海丰大街1301号', u'吉林市长春路169号', u'吉林省长春市净月大街3699号', u'长春市朝阳区宽平大路395号', u'吉林省长春市新城大街5088号',
             u'吉林省吉林市龙潭区承德街45号', u'吉林市吉林经济技术开发区翰林路77号', u'吉林省吉林市吉林大街5号', u'长春市凯旋路3050号', u'吉林省通化市东昌区育才路950号',
             u'吉林省白城市中兴东大路9号', u'吉林省长春市长吉北路677号', u'长春市净月大街3658号', u'长春市绿园区皓月大路1606号（主）', u'长春市自由大路2476号',
             u'吉林省长春市自由大路695号', u'上海市宝山区上大路99号', u'上海市军工路516号', u'上海海港大道1550号',
             u'上海市松江区龙腾路333号', u'浦东新区临港新城沪城环路999号', u'上海市蔡伦路1200号', u'上海市海思路100号', u'上海市松江大学园区龙源路555号',
             u'上海市浦东新区华夏西路5677号', u'浦东新区康桥路1500号', u'上海市青浦区外青松公路7989号', u'上海奉贤区海泉路100号', u'上海市浦东新区金海路2360号',
             u'上海市浦东新区临港新城橄榄路1350号', u'上海市平凉路2103号', u'上海市松江区文翔路1900号', u'上海上川路995号', u'上海市松江区文翔路2800号',
             u'上海市杨浦区长海路399号', u'上海市汾阳路20号', u'上海市华山路630号', u'上海中山西路2271号', u'上海市金海路2727号', u'上海市杨浦区营口路101号',
             u'上海市杨浦区水丰路100号', u'上海市市辖区南汇区周祝公路1-337号', u'上海市奉贤区新海镇海思路500号', u'浦东新区凌桥崇景路100号', u'上海市浦东新区龙东大道200号',]
    addr = random.choice(addrs)
    return addr


def Random_Num(rnd_num):
    #随机生成数字
    rand_num = [random.randint(0, len(string.digits) - 1) for _ in range(rnd_num)]
    # rnd_num = [str(x) for x in rand_num]
    return rand_num
