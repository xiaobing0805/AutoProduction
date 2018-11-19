var index ={
	
		init:function(){
			index.initButton();
		},
		
		initButton:function(){
			$(".index-ul").click(function(){
				if($(this).hasClass("null")){
					$(this).removeClass("null");
					$(".index-li").text("<<");
					$(".left-side").css("margin-left","0px");
					$(".right-side").css("margin-left","220px");
				}else{
					$(this).addClass("null");
					$(".index-li").text(">>");
					$(".left-side").css("margin-left","-180px");
					$(".right-side").css("margin-left","40px");
				}
			});
		}
		
};

$(document).ready(function() {
	index.init();
});