var current_json = '';
var current_json_str = '';


function validateJson(content){
	var resultObj = {};
    var result = '';
    if (content!='') {
        //如果是xml,那么转换为json
        if (content.substr(0,1) === '<' && content.substr(-1,1) === '>') {
            try{
                var json_obj = $.xml2json(content);
                content = JSON.stringify(json_obj);
            }catch(e){
                result = '解析错误：' + e.message ;
                current_json_str = result;
                resultObj.result = result;
                resultObj.success = false;
                return resultObj;
            }

        }
        try{
            current_json = jsonlint.parse(content);
            current_json_str = JSON.stringify(current_json);
            //current_json = JSON.parse(content);
            result = new JSONFormat(content,4).toString();
            resultObj.success = true;
        }catch(e){
            result =e ;
            current_json_str = result;
            resultObj.success = false;
        }
        resultObj.result = result;
        return resultObj;
    }else{
    	resultObj.success = false;
	    resultObj.result = "";
	    return resultObj;
    }
}