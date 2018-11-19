function getContextPath() {
	var pathName = document.location.pathname;

	var curWwwPath = window.document.location.href;
	var pos = curWwwPath.indexOf(pathName);

	var localhostPath = curWwwPath.substring(0, pos);

	var length = pathName.split("/");

	var result = '';
	if (length.length > 3) {
		if (length[1] != 'index') {
			result = '/' + length[1];
		}
	}
	return (localhostPath + result);
}

function getBasePath() {
	var pathName = document.location.pathname;

	var length = pathName.split("/");

	var result = '';
	if (length.length > 3) {
		if (length[1] != 'index') {
			result = '/' + length[1];
		}
	}
	return result;
}

$.utils = {
	/**
	 * 时间格式化 formatStr 为“yyyy-MM-dd” dateTime 为日期类型
	 */
	dateFormat : function(formatStr, dateTime) {

		var str = formatStr;
		var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

		str = str.replace(/yyyy|YYYY/, dateTime.getFullYear());
		str = str
				.replace(/yy|YY/, (dateTime.getYear() % 100) > 9 ? (dateTime
						.getYear() % 100).toString() : '0'
						+ (dateTime.getYear() % 100));

		str = str.replace(/MM/,
				dateTime.getMonth() > 8 ? dateTime.getMonth() + 1 : '0'
						+ (dateTime.getMonth() + 1));
		str = str.replace(/M/g, dateTime.getMonth() + 1);

		str = str.replace(/w|W/g, Week[dateTime.getDay()]);

		str = str.replace(/dd|DD/, dateTime.getDate() > 9 ? dateTime.getDate()
				.toString() : '0' + dateTime.getDate());
		str = str.replace(/d|D/g, dateTime.getDate());

		str = str.replace(/hh|HH/, dateTime.getHours() > 9 ? dateTime
				.getHours().toString() : '0' + dateTime.getHours());
		str = str.replace(/h|H/g, dateTime.getHours());
		str = str.replace(/mm/, dateTime.getMinutes() > 9 ? dateTime
				.getMinutes().toString() : '0' + dateTime.getMinutes());
		str = str.replace(/m/g, dateTime.getMinutes());

		str = str.replace(/ss|SS/, dateTime.getSeconds() > 9 ? dateTime
				.getSeconds().toString() : '0' + dateTime.getSeconds());
		str = str.replace(/s|S/g, dateTime.getSeconds());
		return str;
	},
	
	jsonFormat : function (txt,compress/*是否为压缩模式*/){/* 格式化JSON源码(对象转换为JSON文本) */ 
		var back ="";
		$.ajax({
			type : "post",
			url : getContextPath() + "/convert/prettyJson",
			dataType : 'json',
			 async:false, 
			contentType: 'application/json',
			data : JSON.stringify(txt),
			success : function(response) {
				back =  response.obj;
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.utils.alertError('AJAX出错');
			}
		});
		return back;
		/*   var indentChar = '    ';   
        if(/^\s*$/.test(txt)){   
            $.utils.alertWarning('数据为空,无法格式化! ');   
            return;   
        }   
        try{var data=eval('('+txt+')');}   
        catch(e){   
        	$.utils.alertWarning('数据源语法错误,格式化失败! 错误信息: '+e.description,'err');   
            return;   
        };   
        var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;   
           
        var notify=function(name,value,isLast,indent缩进,formObj){   
            nodeCount++;节点计数  
            for (var i=0,tab='';i<indent;i++ )tab+=indentChar; 缩进HTML   
            tab=compress?'':tab;压缩模式忽略缩进  
            maxDepth=++indent;缩进递增并记录  
            if(value&&value.constructor==Array){处理数组  
                draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);缩进'[' 然后换行  
                for (var i=0;i<value.length;i++)   
                    notify(i,value[i],i==value.length-1,indent,false);   
                draw.push(tab+']'+(isLast?line:(','+line)));缩进']'换行,若非尾元素则添加逗号  
            }else   if(value&&typeof value=='object'){处理对象  
                    draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);缩进'{' 然后换行  
                    var len=0,i=0;   
                    for(var key in value)len++;   
                    for(var key in value)notify(key,value[key],++i==len,indent,true);   
                    draw.push(tab+'}'+(isLast?line:(','+line)));缩进'}'换行,若非尾元素则添加逗号  
                }else{   
                        if(typeof value=='string')value='"'+value+'"';   
                        draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
                };   
        };   
        var isLast=true,indent=0;   
        notify('',data,isLast,indent,false); 
        return draw.join('');   */
    },

	submit : function(controllerURL, formId, dialogId, errMsg, data,
			refreshTable, dialogShow, sucMsg) {
		var reqData = null;
		var that = this;

		if (formId) {
			reqData = $(formId).serialize();
		} else {
			reqData = data;
		}
		$.ajax({
			type : "post",
			url : getContextPath() + controllerURL,
			dataType : 'json',
			data : reqData,
			async : false,
			success : function(response) {
				if (response.success == true) {
					if (refreshTable) {
						$(refreshTable).bootstrapTable('refresh');
					}
					if (!dialogShow) {
						$(dialogId).modal('hide');
					}
					if (sucMsg) {
						$.utils.alertSuccess(sucMsg);
					}
				} else {
					$.utils.alertWarning(response.errorMessage);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.utils.alertError('AJAX出错');
			}
		});
	},
	alertError : function(msg, options) {
		toastr.error(msg,'错误');
	},
	alertSuccess : function(msg, options) {
		toastr.success(msg,'成功');
	},
	alertWarning : function(msg, options) {
		toastr.warning(msg,'警告');
	},
	alertInfo : function(msg, options) {
		toastr.info(msg,'信息');
	},
	objToJson : function(obj) {
		return JSON.stringify(obj);

	},
	updatePsd : function() {
		if ($('#updatePasswordForm').valid()) {
			$.utils.submit('/user/updatePsdByPrimaryKeySelective',
					'#updatePasswordForm', '#updatePassWordDialog', '修改出错~',
					null, false, null, '修改成功~');
		}
	},
	updatePsdByUsername : function() {

		$('#updatePasswordForm div').removeClass('has-error');

		$('#updatePasswordForm').validate().resetForm();

		$('#updatePasswordForm')[0].reset();

		$('#updatePassWordDialog').modal('show');
	},
	initValid : function(id) {
		$('#idForUpdatePsd').val(id);

		$('#updatePasswordForm').validate({
			rules : {
				orignPsd : {
					required : true,
					rangelength : [ 6, 10 ]
				},
				newPsd : {
					required : true,
					rangelength : [ 6, 10 ]
				},
				newPsdConfirm : {
					equalTo : '#newPassword'
				}
			},
			messages : {
				orignPsd : {
					required : "原密码不能为空",
					rangelength : "原密码6-10位"
				},
				newPsd : {
					required : "新密码不能为空",
					rangelength : "新密码6-10位"
				},
				newPsdConfirm : {
					equalTo : "两次密码输入不一致"
				}
			},
			errorClass : "text-danger",
			errorElement : "span",
			highlight : function(element, errorClass, validClass) {
				$(element).parent().addClass('has-error');
			},
			unhighlight : function(element, errorClass, validClass) {
				$(element).parent().removeClass('has-error');
			}
		});
	},
	logout : function() {
		sessionStorage.clear();
		window.location.href = getBasePath() + "/logout";
	},
	init : function() {
		var id = $.utils.loadUserName();
		var height = $(window).height()-50;
		$("#content").css({"height":height,"overflow-y":"auto"});
		$.utils.initValid(id);
		toastr.options = {
		  "closeButton": true,
		  "debug": false,
		  "newestOnTop": true,
		  "progressBar": true,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
	},
	initMenu : function() {
		$.utils.init();
		var id = $.utils.loadUserName();
		$("#sidebar-menu").find("li").remove();
		$.utils.loadSideBar(id);
		$(".treeview").each(function (){
			var btn = $(this).children("a").first();
			var menu =$(this).children(".treeview-menu").first();
			var isActive =$(this).hasClass('active');
			// initialize already active menus
			if (isActive) {
				menu.show();
				btn.children(".fa-angle-left").first().removeClass(
						"fa-angle-left").addClass("fa-angle-down");
			}
			// Slide open or close the menu on link click
			btn.click(function(e) {
				e.preventDefault();
				var isActive = btn.parent("li").hasClass('active');
				if (isActive) {
					// Slide up to close menu
					menu.slideUp();
					isActive = false;
					btn.children(".fa-angle-down").first().removeClass(
							"fa-angle-down").addClass("fa-angle-left");
					btn.parent("li").removeClass("active");
				} else {
					menu.slideDown();
					isActive = true;
					$(".treeview").each(
							function() {
								var active = $(this).attr("class");
								if (active != "treeview") {
									$(this).attr("class", "treeview");
									$(this).find(".fa-angle-down").first()
											.removeClass("fa-angle-down")
											.addClass("fa-angle-left");
									/*$(this).children(".treeview-menu").first()
											.css("display", "none")*/
									$(this).children(".treeview-menu").first().slideUp();
								}
							});
                    
					btn.children(".fa-angle-left").first().removeClass(
							"fa-angle-left").addClass("fa-angle-down");
					btn.parent("li").addClass("active");
					btn.next().css("display", "block");
				}
			});

			/* Add margins to submenu elements to give it a tree look */
			menu.find("li > a").each(function() {
				var pad = parseInt($(this).css("margin-left")) + 10;

				$(this).css({
					"margin-left" : pad + "px"
				});
			});
			
			
		});
		$(".treeview-menu > li ").click(function(index, elm) {
			var path = $(this).children("a").attr("data-url");
			$.utils.loadModule(path);
			$(".treeview-menu > li ").each(function(index, elm) {
				$(this).removeClass("choice");
			});
			$(this).addClass("choice");

		});
	},
	loadUserName : function() {
		var id = 0;
		$.ajax({
			url : getContextPath() + "/system/userInfo",
			dataType : 'json',
			type : 'get',
			async : false,
			success : function(response) {
				if (response.success) {
					if (response.obj.sysUsername == null
							|| response.obj.sysUsername == "") {
						window.location.href = '../pages/417.html';
					} else if (response.obj.delStatus) {
						window.location.href = '../pages/404.html';
					} else {
						$("#userName").text(response.obj.sysName);
						$("#userNumber").text(response.obj.sysUsername);
						$("#userName2").text(response.obj.sysName);
						$("#helloUserName").text(
								"hello," + response.obj.sysName);
						id = response.obj.id;
						$.utils.loadSideBar(id);
					}
				} else {

				}
			},

		});

		return id;
	},
	loadSideBar : function(id) {
		var url = getContextPath() + "/system/loadSideMenus";
		var firstMenu = null;
		var firstChildMenu = null;
		$.ajax({
			url : url,
			data : {
				id : id
			},
			dataType : "json",
			async : false, // 子菜单需要同步加载
			cache : true, // 可以使用缓存
			success : function(response) {
				var html = '';
				var resArr = response.obj;
				for (var i = 0; i < resArr.length; ++i) {// 一级children
					if (firstMenu == null) {
						firstMenu = resArr[i].resourceUrl;
					}
					html += '<li class="treeview">';
					html += '<a href="#">';
					html += '<i class="' + resArr[i].icon + '"></i>';// 图标可以改变
					html += '<span>' + resArr[i].resourceName + '</span>'
					html += '<i class="fa fa-angle-left pull-right"></i>';
					html += '</a>';
					html += '<ul class="treeview-menu">';
					var childMenu2 = resArr[i].childMenu;
					for (var j = 0; j < childMenu2.length; ++j) {// 二级children
						/*
						 * var tempStr = childMenu[k] + ".html"; var
						 * icon=childMenu.icon; alert(icon);
						 */
						var k = childMenu2[j];
						html += '<li><a data-url="' + k.resourceUrl + ".html"
								+ '" href="#"><i class="' + k.icon
								+ '"></i>' + k.resourceName + '</a></li> '

					}
					html += '</ul>'
					html += '</li>';
				}
				$('#sidebar-menu').html(html);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == '401') {

				}
			}
		});
		return firstChildMenu;
	},
	/**
	 * 加载主页面
	 * 
	 * @param path
	 *            页面路径
	 * @param historyFlag
	 *            是否加入到历史记录中,true 为是,false为否
	 * @param sessionFlag
	 *            是否需要清除session,true 为是, false 为否
	 * @param json
	 *            需要存入到session中的json数据
	 */
	loadModule : function(path) {
		var url = getContextPath() + path;
		$.ajax({
			url : url,
			async : false, // 需要异步加载
			dataType : "html",
			cache : false,
			success : function(data) {
				$('#content').html('');
				$('#content').html(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (XMLHttpRequest.status == '401') {
					window.location.href = getContextPath();
				}
			}
		});
	},
	
	/**
	 * select2帮助类 **/
	findAllApp : function(appName,appId,url,appType,flag,id){
		var select = $("#"+appName).select2({
			ajax:{
				url:getContextPath() + url,
				dataType:'json',
				type:"POST",
				data:function (params) {
					return{
						params:params.term,
						appType:appType,
						parentId:id
					}
				},
				processResults:function(data){
					return{
						results:data.obj
					}
				},
				cache:true
			},
			escapeMarkup : function(markup){
				return markup;
			},
			templateResult:function formatRepo(repo){
				markup = "<option>" + repo.name + "</option>";
				return markup;
			},
			templateSelection:function fomratRepoSelection(repo){
				$("#"+appId).val(repo.id);
				$("#"+appName).text(repo.name);
				return repo.name || repo.text;
			}
		});
		if(typeof(flag) != "undefined" ){
			var option = $("<option selected>" + flag + "</option>").val(id);
			$("#"+appName).text("");
			select.append(option).trigger('change');
		}
	},
	searchApp : function(appName,appId,url,appType,parentId){
		$("#"+appName).select2({
			ajax:{
				url:getContextPath() + url,
				dataType:'json',
				type:"POST",
				data:function (params) {
					return{
						params:params.term,
						appType:appType,
						parentId:parentId
					}
				},
				processResults:function(data){
					var a = {id:"-1",name:"全部"};
					data.obj.unshift(a);
					return{
						results:data.obj
					}
				},
				cache:true
			},
			escapeMarkup : function(markup){
				return markup;
			},
			templateResult:function formatRepo(repo){
				markup = "<option>" + repo.name + "</option>";
				return markup;
			},
			templateSelection:function fomratRepoSelection(repo){
				$("#"+appId).val(repo.id);
				$("#"+appName).text(repo.name);
				return repo.name || repo.id;
			}
		})	
	},
	isJSON : function(str){
		if (typeof str == 'string') {
	        try {
	            var obj=JSON.parse(str);
	            if(str.indexOf('{')>-1){
	                return true;
	            }else{
	                return false;
	            }

	        } catch(e) {
	            return false;
	        }
	    }
	    return false;
	},
	addHeader:function(opt,tablename,flag){
			var html = '';
			html += 	'<tr style="margin-bottom:5px;">';
			html += 		'<td style="width:40%;text-align: center;">';
			html += 			'<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headKey" required="true">'
			html += 		'</td>';
			html += 		'<td style="width:5%;text-align: center;">:</td>';
			html += 		'<td style="width:40%;text-align: center;">';
			html += 		'<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headValue" required="true">';
			
			html += 		'</td>';
			html += 		'<td style="width:10%;text-align:center;"><a class="detail-icon" href="javascript:" onclick="$.utils.removeHeader(this)"><i class="glyphicon glyphicon-minus icon-minus"></i></a></td>';
			html += 	'</tr>';
			$("#"+tablename).append(html);
			if(flag){
				$("#"+tablename+" input[name='headKey']").blur(function(){
					  var regex = /\$\{[\w\W]*\}/;
					  if( !regex.test($(this).val())){
						  $(this).addClass("inputKeyError");
					  }else{
						  $(this).removeClass("inputKeyError");
					  }
				});
			}
	},
	removeHeader:function(opt){
		$(opt).parent().parent().remove(); 
	},
	getHeader:function(tablename){
		var headers = {};
		$('#'+tablename).find("tr").each(function(){
			var indexTr = $(this).index();
			if(indexTr >0){
				var headKey = $(this).find("input[name='headKey']").val().trim();
				var headValue = $(this).find("input[name='headValue']").val().trim();
				if(headKey !="" && headValue != ""){
					headers[headKey] = headValue;
				}
			}else{
				return;
			}
		});
		return JSON.stringify(headers);
	},
	analysisHeader:function(httpHeader,tablename){
		httpHeader = JSON.parse(httpHeader);
		$("#"+tablename).html('');
		var html = '<tbody><tr>\
			<td style="width:40%;text-align: center;">键</td>\
			<td style="width:5%;text-align: center;"></td>\
			<td style="width:40%;text-align: center;">值</td>\
			<td style="width:10%;text-align:center;">\
			<a class="detail-icon" href="javascript:" onclick="$.utils.addHeader(this,\''+tablename+'\',false)"><i class="glyphicon glyphicon-plus icon-plus"></i></a></td>\
		</tr>\
		<tr>\
			<td style="width:40%;text-align: center;">\
				<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headKey" required="true" value="Content-Type">\
			</td>\
			<td style="width:5%;text-align: center;">:</td>\
			<td style="width:40%;text-align: center;">\
				<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headValue" required="true" value="application/json">\
			</td>\
		</tr>';
	      for(var key in httpHeader){
	    	  if(key != "Content-Type"){
				html += 	'<tr style="margin-bottom:5px;">\
							<td style="width:40%;text-align: center;">\
							<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headKey" required="true" value=\"'+key+'\"> \
							</td>\
							<td style="width:5%;text-align: center;">:</td>\
							<td style="width:40%;text-align: center;">\
							<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headValue" required="true" value=\''+httpHeader[key]+'\'>\
							</td>\
							<td style="width:10%;text-align:center;"><a class="detail-icon" href="javascript:" onclick="$.utils.removeHeader(this)"><i class="glyphicon glyphicon-minus icon-minus"></i></a></td>\
							</tr>';
	    	  }
	      }
		html += "</tbody>";
	    $("#"+tablename).html(html);
	},
	analysisVariable:function(listVariable,tablename){
		var html = '';
	      for(var i=0;i<listVariable.length;i++){
			html += 	'<tr style="margin-bottom:5px;">\
						<td style="width:40%;text-align: center;">\
						<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headKey" required="true" value=\"'+listVariable[i].globalVarKey+'\"> \
						</td>\
						<td style="width:5%;text-align: center;">:</td>\
						<td style="width:40%;text-align: center;">\
						<input type="text" class="header-params form-control" style=" border-radius: 4px !important;" name="headValue" required="true" value=\"'+listVariable[i].xpath+'\">\
						</td>\
						<td style="width:10%;text-align:center;"><a class="detail-icon" href="javascript:" onclick="$.utils.removeHeader(this)"><i class="glyphicon glyphicon-minus icon-minus"></i></a></td>\
						</tr>';
    	  }
	    $("#"+tablename).append(html);
	},
	getVariables:function(tablename){
		var variables=[];
		$('#'+tablename).find("tr").each(function(){
			var indexTr = $(this).index();
			if(indexTr>0){
				var obj = {};
				var globalVarKey = $(this).find("input[name='headKey']").val().trim();
				var xpath = $(this).find("input[name='headValue']").val().trim();
				if(globalVarKey!=""  && xpath !=""){
					obj.globalVarKey = globalVarKey;
					obj.xpath = xpath;
					variables.push(obj);
				}
			}
		});
		return variables;
	},
	selectChange:function(selectId){
		$(selectId).on('select2:select', function (e) {
			$("#selectError").css("display","none");
		});
	}
};

//用于函数预览
$.defineFunc = {
		init:function(){
			var sftextarea = $("#sftextarea");
			var height = sftextarea.height();
			var padtop = (sftextarea.innerHeight() -height)/2;
			var divs = $("div.sfdiv");
			divs.attr("data-container","body");
			divs.attr("role","button");
			divs.each(function (index) { 
				$(this).attr("tabindex",""+index) ;
				var value = $(this).text();
				$(this).popover({
					toggle:'popover',
					html:'true',
					placement:'top',
					trigger:'focus',
					content:$.defineFunc.getDes(value)
				});
			});
		},
		hideAll:function(){
			$("div.sfdiv").popover('hide'); 
		},
		getDataforTemplate:function(templateId,resultId){
			var dataTemplate = $(templateId).val();
			var data = Mock.mock(eval('(' + dataTemplate + ')'));
			var parms = $.utils.jsonFormat(JSON.stringify(data))
			$(resultId).val(parms);
		},
		getNowFormatDate:function() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    var strMinute = date.getMinutes();
		    var strSecond = date.getSeconds();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strMinute >= 0 && strMinute <= 9) {
		    	strMinute = "0" + strMinute;
		    }
		    if (strSecond >= 0 && strSecond <= 9) {
		    	strSecond = "0" + strSecond;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + strMinute
		            + seperator2 + strSecond;
		    return currentdate;
		},
		getDes:function(val){
			var firstLineHead = '<p><strong>使用方式：</strong>';
			var secondLineHead = '<p><strong>参数列表：</strong>';
			var thirdLineHead = '<p><strong>返回结果：</strong>';
			//此处扩展函数使用的提示
			if(val == "@id")
				return firstLineHead +'"@id"或\
				"@id()"</p>'
				+ secondLineHead + '无</p>'
				+ thirdLineHead + '身份证字符串，例"460000200507186310"</p>';
			else if(val == "@sfwbnum 运单")
				return firstLineHead +'"@sfwbnum"\
				或"@sfwbnum()"\
				或"@sfwbnum([755,756])"</p>'
				+ secondLineHead + '可选，若有请传入特定三位数开头的数组</p>'
				+ thirdLineHead + '运单号字符串，例"756165328602"</p>';
			else if(val == "@sfaddress 地址")
				return firstLineHead +'"@sfaddress"\
				或"@sfaddress()"</p>'
				+ secondLineHead + '无</p>'
				+ thirdLineHead + '地址字符串，例"甘肃省 武威市 天祝藏族自治县"</p>';
			else if(val == "@name")
				return firstLineHead +'"@name"或\
				"@name()"或\
				"@name(true)"</p>'
				+ secondLineHead + '可选，若有请传入true或false，是否生成middle name</p>'
				+ thirdLineHead + '英文名字符串，例"Betty Johnson"</p>';
			else if(val == "@cname")
				return firstLineHead +'"@cname"或\
				"@cname()"</p>'
				+ secondLineHead + '无</p>'
				+'<p><strong>返回结果：</strong>中名字符串，例"董芳"</p>';
			else if(val == "@date")
				return firstLineHead +'"@date"或\
				"@date()"或\
				"@date(\'yyyy-MM-dd\')"</p>'
				+ secondLineHead + '可选，若有请传入日期格式</p>'
				+ thirdLineHead + '日期字符串，例"1999-05-28"</p>';
			else if(val == "@time")
				return firstLineHead +'"@time"或\
				"@time()"或\
				"@time(\'HH:mm:ss\')"</p>'
				+ secondLineHead + '可选，若有请传入时间格式</p>'
				+ thirdLineHead + '时间字符串，例"17:31:18"</p>';
			else if(val == "@datetime")
				return firstLineHead +'"@datetime"或\
				"@datetime()"或\
				"@datetime(\'yyyy-MM-dd HH:mm:ss\')"</p>'
				+ secondLineHead + '可选，若有请传入时间格式</p>'
				+ thirdLineHead + '日期时间字符串，例"1999-05-28 17:31:18"</p>';
			else if(val == "@boolean")
				return firstLineHead +'"@boolean"或\
				"@boolean()"</p>'
				+ secondLineHead + '无</p>'
				+ thirdLineHead + 'boolean类型，例true</p>';
			else if(val == "@natural")
				return firstLineHead +'"@natural"或\
				"@natural()"或\
				"@natural(min)"或\
				"@natural(min,max)"</p>'
				+ secondLineHead + '参数可选，参数一个设定最小值，参数两个设定区间</p>'
				+ thirdLineHead + '自然数，例64</p>';
			else if(val == "@integer")
				return firstLineHead +'"@integer"或\
				"@integer()"或\
				"@integer(min)"或\
				"@integer(min,max)"</p>'
				+ secondLineHead + '参数可选，参数一个设定最小值，参数两个设定区间</p>'
				+ thirdLineHead + 'integer类型，例8542716927915676</p>';
			else if(val == "@float")
				return firstLineHead +'"@float"或\
				"@float()"或\
				"@float(min,max,dmin, dmax)"</p>'
				+ secondLineHead + '参数可选，参数个数可以为为1、2、3、4，依次为设置整数部分最小值、最大值、小数位数最小值、小数位数最大值</p>'
				+ thirdLineHead + 'float类型，例86.737254412</p>';
			else if(val == "@now")
				return firstLineHead +'"@now"或\
				"@now()"或\
				"@now(\'yyyy-MM-dd HH:mm:ss\')"</p>'
				+ secondLineHead + '可选，若有请传入时间格式</p>'
				+ thirdLineHead + '当前日期时间字符串，例"'+$.defineFunc.getNowFormatDate()+'"</p>';
			else if(val == "@range")
				return firstLineHead +'"@range(start, stop)"或\
				"@range(stop)"或\
				"@range(start, stop, step)"</p>'
				+ secondLineHead + 'stop为结束值,start起始值，step为相邻数字步长</p>'
				+ thirdLineHead + '数字数组，例[1,3,5]</p>';
			else if(val == "@character")
				return firstLineHead +'"@character"或\
				"@character()"或\
				"@character(\'lower/upper/number/symbol\')"</p>'
				+ secondLineHead + '可选，若有请传入字符池名称lower/upper/number/symbol（小写、大写、数字、符号）其中一个</p>'
				+ thirdLineHead + '单个字符，例"e"</p>';
			else if(val == "@string")
				return firstLineHead +'"@string"或\
				"@string()"或\
				"@string(length)或\
				"@string(pool, length)"</p>'
				+ secondLineHead + '可选，一个参数表示长度；两个参数前一个代表字符池pool和长度pool可选\'lower\'小写、\'upper\'大写、\'number\'数字、\'symbol\'符号</p>'
				+ thirdLineHead + '字符串，例"f4/gd"</p>';
			else return val;
		}
	};

/** 将表单序列化为一个json对象，只支持单个值的控件 */
$.fn.serializeFormToJson = function() {
	var serializeObj = {};
	$(this.serializeArray()).each(function() {
		serializeObj[this.name] = this.value;
	});
	return serializeObj;
}


/**
 * select2帮助类
 *
 * @param repo
 * @returns {string}
 */
function formatRepo(repo) {

	var markup = "<div class='select2-results__options'>" + repo.name
			+ "</div>";
	return markup;
}

function formatRepoSelection(repo) {
	return repo.name || repo.text;
}

function formatRepoSelectionSys(repo) {
	$("input[name='systemCode']").val(repo.id);
	$("input[name='systemCode']").text(repo.name);
	return repo.name || repo.text;
}

function formatRepoSelectionApp(repo) {
	$("input[name='appName']").val(repo.id);
	return repo.name || repo.text;
}


$.copyClipboard = {
		copy:function(address){
			var ciAddress = document.createElement("input");
			ciAddress.style.position = 'fixed';
			ciAddress.style.top = 0;
			ciAddress.style.left = 0;
			ciAddress.style.width = '2em';
			ciAddress.style.height = '2em';

			ciAddress.style.padding = 0;

			ciAddress.style.border = 'none';
			ciAddress.style.outline = 'none';
			ciAddress.style.boxShadow = 'none';

			ciAddress.style.background = 'transparent';
			ciAddress.value = address;
			document.body.appendChild(ciAddress);
			ciAddress.select(); // 选择对象
			document.execCommand("Copy"); 
			document.body.removeChild(ciAddress);
			$.utils.alertSuccess("复制地址："+address+"成功！")
		}
}

$.getTemplateData = {
		getDataforTemplate:function(formId,templateName,resultName){
			var dataTemplate = $(formId + " textarea[name='"+templateName+"']").val();
			try{
				var data = Mock.mock(eval('(' + dataTemplate + ')'));
				var parms = $.utils.jsonFormat(JSON.stringify(data));
				$(formId + " textarea[name='"+resultName+"']").val(parms);
			}catch(e){
				$(formId + " textarea[name='"+resultName+"']").val("请检查模板json结构");
			}	
		}
}

$.select2Helper = {
		selectChange:function(selectId,errorId){
			$(selectId).on('select2:select', function (e) {
				$(errorId).css("display","none");
			});
		}
}
/**
 * 单个接口http断言
 */
$.interfaceAssert = {
		addAssert:function(asserId){
			var length = $(asserId+" .panel-default").length;
			var html = '<div class="panel panel-default">\
						   <div class="panel-heading">\
				            <h4 class="panel-title">\
				                <a data-toggle="collapse" data-parent="#accordion" \
				                href="#collapse_'+length+'">断言'+(length+1)+'\
				                </a>\
				                <span class="glyphicon glyphicon-remove" style="float:right;cursor:pointer" onclick="$.interfaceAssert.removeAssert(this)"></span>\
				            </h4>\
				        </div>\
				        <div id="collapse_'+length+'" class="panel-collapse collapse in">\
				            <div class="panel-body">\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label">xpath表达式:</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<input type="text" class="form-control" name="xpathExpression">\
									</div> \
								</div>\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label" >匹配规则:</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<select class="form-control" name="matchingRules" >\
											<option value="equals">等于期望值</option>\
											<option value="contain">包含期望值</option>\
											<option value="contained">包含于期望值</option>\
											<option value="not contained">不包含期望值</option>\
										</select>\
									</div>\
								</div>\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label" >期望值：</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<input type="text" class="form-control" name="expectedValue"\
											placeholder="必填" >\
									</div>\
								</div>\
				            </div>\
				        </div>\
				    </div>';
			$(asserId).append(html);
		},
		removeAssert:function(obj){
			$(obj).parent().parent().parent().remove();
		},
		
		analysisAssertation:function(assertations){
			if(assertations != ""){
				var asserts = JSON.parse(assertations);
				var html = ""
				for(var i=0; i<asserts.length; i++){
					html += '<div class="panel panel-default">\
						   <div class="panel-heading">\
				            <h4 class="panel-title">\
				                <a data-toggle="collapse" data-parent="#accordion" \
				                href="#collapse_'+i+'">断言'+(i+1)+'\
				                </a>\
				                <span class="glyphicon glyphicon-remove" style="float:right;cursor:pointer" onclick="$.interfaceAssert.removeAssert(this)"></span>\
				            </h4>\
				        </div>\
				        <div id="collapse_'+i+'" class="panel-collapse collapse in">\
				            <div class="panel-body">\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label">xpath表达式:</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<input type="text" class="form-control" name="xpathExpression" value="'+asserts[i].xpathExpression+'">\
									</div> \
								</div>\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label" >匹配规则:</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<select class="form-control" name="matchingRules" >\
											<option value="equals">等于期望值</option>\
											<option value="contain">包含期望值</option>\
											<option value="contained">包含于期望值</option>\
											<option value="not contained">不包含期望值</option>\
										</select>\
									</div>\
								</div>\
								<div class="tablediv col-md-12 col-xs-12 col-lg-12 col-sm-12">\
									<label class="col-md-2 col-xs-2 col-lg-2 col-sm-2 table-label" >期望值：</label>\
									<div class="col-md-10 col-xs-10 col-lg-10 col-sm-10">\
										<input type="text" class="form-control" name="expectedValue"\
											value="'+asserts[i].expectedValue+'">\
									</div>\
								</div>\
				            </div>\
				        </div>\
				    </div>';
					$("#collapse_"+i+" select[name='matchingRules']").val(asserts[i].matchingRules);
				}
				$("#assertations").html(html);
			}
		}
}

//用于版本选择
$.versionSelect = {
		appSelect : function(appSelect,versionSelect) {
			$("#"+appSelect).val("").trigger("change");
			var select = $("#"+appSelect).select2({
				placeholder : "默认全部",
				language : "zh-CN",
				ajax : {
					url : getContextPath() + "/testAppInfo/selectAllAppForCombo",
					dataType : "json",
					type : "POST",
					data : function(para) {
						para.term = "";
						return para;
					},
					processResults : function(data) {
						return {
							results : data
						}
					},
					cache : true
				},
				//minimumResultsForSearch : Infinity,
				escapeMarkup : function(markup) {
					return markup;
				},
				templateResult : function(repo) {
					var markup = "<div>" + repo.text + "</div>";
					return markup;
				},
				templateSelection : function(repo) {
					return repo.name || repo.text;
				}
			}).on('select2:select', function(evt) {
				var appId = evt.params.data.id;
				$("#addAppId").val(appId);
				$.versionSelect.versionSelect(appId,versionSelect);
			});
		},
		
		versionSelect : function(appId,versionSelect) {
			$("#"+versionSelect).val("").trigger("change");
			var select = $("#"+versionSelect).select2({
				placeholder : "默认全部",
				language : "zh-CN",
				ajax : {
					url : getContextPath() + "/testVersionInfo/selectVersionForCombo",
					dataType : "json",
					type : "POST",
					data : {
						appId : appId
					},
					processResults : function(data) {
						return {
							results : data
						}
					},
					cache : true
				},
				//minimumResultsForSearch : Infinity,
				escapeMarkup : function(markup) {
					return markup;
				},
				templateResult : function(repo) {
					var markup = "<option>" + repo.text + "</option>";
					return markup;
				},
				templateSelection : function(repo) {
					$("#addTestInterfaceVersionRelForm input[name='versionId']").val(repo.id);
					$("#addVersionId").val(repo.id);
					return repo.name || repo.text;
				}
			});
		},
}

$.selectZk = {
		initZK :function(flag,id){
			var select = $("#registerAddr").select2({
				ajax:{
					url:getContextPath() + "/testZkInfo/getZkList",
					dataType:'json',
					type:"GET",
					processResults:function(data){
						return{
							results:data.obj
							
						}
					},
					cache:true
				},
				escapeMarkup : function(markup){
					return markup;
				},
				templateResult:function formatRepo(repo){
					markup = "<option id=" + repo.id+ ">" + repo.name + "</option>";
					return markup;
				},
				templateSelection:function fomratRepoSelection(repo){
					console.log(repo)
					$("#registerAddrId").val(repo.id);
					$("#registerAddr").text(repo.name);
					return repo.name || repo.id;
				}
			});
			if(typeof(flag) != "undefined" ){
				var option = $("<option selected>" + flag + "</option>").val(id);
				$("#registerAddr").text("");
				select.append(option).trigger('change');
			}
		}
}

$.ztreeUtils = {
		initTree:function(clickMethod,viewMethod,data){
			var nodes;
			var zTreeObj;
			 $.ajax({
				 url:getContextPath()+"/testInterfaceVersionRel/getAppInterface",
				 type:"POST",
				 dateType : "json",
				 data:data,
			 	async:false,
			 	success:function(response){
			 		 nodes = response.obj;
			 	}
			 });
		 
			 var setting={
					 check:{
						 chkboxType:{"Y":"ps","N":"ps"},
						 chkStyle:"radio",
						 enable:false,
					 },
					 edit:{
						 enable:false,
						 removeTitle:"删除",
						 showRemoveBtn:false,
						 showRenameBtn:false,
					 },
					 callback:{
						 beforeClick:false,
						 beforeRemove:false,
						 beforeEditName:false,
						 onClick:clickMethod,
						 onRemove:false,
						 onRightClick:false,
						 onExpand:true,
					 },	
					 view:{
						 fontCss:viewMethod
					 }
			 };
			 zTreeObj = $.fn.zTree.init($("#InterfaceTree"), setting, nodes);
			 return zTreeObj;
		 },	
}

$.utils.slidebar={
	toggle : function(){
		var slidebar = $("#slidebar");
		var slidebarClass = "";
		try{
			slidebarClass = slidebar.attr("class");
		}catch(e){
			return ;
		}
		var sbClose = "sb-slidebar sb-right sb-style-overlay  sb-close";
		var sbOpen = "sb-slidebar sb-right sb-style-overlay sb-active sb-open";
		if(sbOpen == slidebarClass ){
			slidebar.attr("class",sbClose);
		}else{
			slidebar.attr("class",sbOpen);
		}
	}
}

$.utils.mockfunc={
	sessionKey:"mockFuncSessionKey",
	getAllFromCache : function(){
		var mfMap = {};
		$.ajax({
			 url:getContextPath()+"/mockFunction/getCache",
			 type:"POST",
			 dateType : "json",
			 async:false,
			 success:function(response){
		 		if(response.success == true){
		 			mfMap = response.obj;
		 			//var sessionHasValue = "@id" in mfMap;
		 			sessionStorage.setItem($.utils.mockfunc.sessionKey, JSON.stringify(mfMap));
		 		}
			 },
			 error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.utils.alertError('AJAX出错');
			 }
		});
		return mfMap;
	},
	getAllFromDb : function(){
		$.ajax({
			 url:getContextPath()+"/mockFunction/getAll",
			 type:"POST",
			 dateType : "json",
			 success:function(response){
		 		if(response.success == true){
		 			var mfMap = response.obj;
		 			sessionStorage.setItem($.utils.mockfunc.sessionKey, JSON.stringify(mfMap));
		 			$.utils.alertSuccess("缓存刷新成功！");
		 		}
			 },
			 error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.utils.alertError('AJAX出错');
			 }
		});
	},
	getAll : function(){
		var str = sessionStorage.getItem($.utils.mockfunc.sessionKey)
		var mfMap = JSON.parse(str);
		var sessionHasValue = false;
		try{
			sessionHasValue = "@id" in mfMap; 
		}catch(e){
			sessionHasValue = false;
		}
		if(sessionHasValue){
			return mfMap;
		}else{
			return $.utils.mockfunc.getAllFromCache();
		}
	},
	init:function(nameIssfdiv){
		var outDiv = {};
		if(nameIssfdiv){
			outDiv = $("[name='sfdiv']") 
		}else{
			outDiv = $("#sfdiv");
		}
		outDiv.empty();
		var mfMap = $.utils.mockfunc.getAll();
		for (key in mfMap){ 
			outDiv.append("<div class=\"sfdiv\">"+key+"</div>");
 		}  
		var divs = $("div.sfdiv");
		divs.attr("data-container","body");
		divs.attr("role","button");
		divs.each(function (index) { 
			$(this).attr("tabindex",""+index) ;
			var value = $(this).text();
			$(this).popover({
				toggle:'popover',
				html:'true',
				placement:'top',
				trigger:'focus',
				content:$.utils.mockfunc.getDes(value)
			});
		});
	},
	getDes : function(val){
		var firstLineHead = '<p style="word-break:break-all"><strong>使用方式：</strong>';
		var secondLineHead = '<p style="word-break:break-all"><strong>参数列表：</strong>';
		var thirdLineHead = '<p style="word-break:break-all"><strong>返回结果：</strong>';
		var mfMap = $.utils.mockfunc.getAll();
		for (key in mfMap){ 
			if(val == key){
				return firstLineHead +mfMap[key].useWay+'</p>'
				+ secondLineHead + mfMap[key].paramList+'</p>'
				+ thirdLineHead + mfMap[key].result+'</p>';
			}
 		} 
 		return "未找到该函数";
	}
}

   
