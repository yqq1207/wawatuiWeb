$(function(){
	/*根据浏览器窗口大小设置页面狂傲*/
	$(".box").css('height',$(window).height() - 30);
	$(window).resize(function(){
		$('.box').css('height',$(window).height() - 30);
	});
	
	
	/*几种分享的情况*/
	$(document).on("open", ".weui-popup-modal", function() {
	    console.log("open popup");
	  }).on("close", ".weui-popup-modal", function() {
	    console.log("close popup");
	  });
	  $(document).on("click", "#show-confirm", function() {
	    $.confirm("快点击右上角分享，来获取娃娃币吧", "确认分享?", function() {
	      $.toast("您选择了分享!");
	    }, function() {
	      //取消操作
	      $.toast("您取消了分享!",'cancel');
	    });
	  });
	  
//	  var storage = window.localStorage;
//	  
////	  获取userId
//	var userId = GetQueryString('__hbt');
//	storage.setItem('wwtUserId',userId);/*存储wwtUserId到缓存中*/
//	var data = {
//// 		userId:userId  //真是数据
//		'userId':201919   //测试数据
//	};
//	console.log(data)
//	
//	  /*查询娃娃币*/
//	 var ajaxMyMoney = function(data){//ajax获取娃娃币，以及邀请链接
//	 	
//	 
//		 $.ajax({	
//		 	type:"post",
//		 	url:"http://dbggm.imoyuu.com/api/getUser/getUserInfo",
//		 	async:true,
//		 	data:data,
//		 	success:function(data){
//		 		var dollCoin,dollCoinExchange;
//		 		if(data.code == 0){//成功
//		 			dollCoin = data.data.dollCoin;
//		 			dollCoinExchange = data.data.dollCoinExchange;//金币数量,金币和余额兑换比例
//		 		}else{//失败
//		 			dollCoin=0;
//		 			dollCoinExchange=10;
//		 		}
//		 		storage.setItem('dollCoinExchange',dollCoinExchange);//将金币和余额兑换比例存入缓存；
//	//	 		console.log(data.data.dollCoin);
//	//			storage.setItem('myDollCoin',data.data.dollCoin);/*存储到缓存中*/
//	//	 		$('.money-all font').text(data.data.dollCoin);
//		 		storage.setItem('myDollCoin',dollCoin);/*存储娃娃币余额到缓存中*/
//		 		$('.money-all font').text(dollCoin);
//		 		return 'www.baidu.com';
//		 	},
//		 	error:function(error){
//				var dataCode = 0;
//				storage.setItem('myDollCoin',dataCode);/*存储到缓存中*/
//		 		$('.money-all font').text(dataCode);
//		 	}
//		 	
//		 });
//	 
//	}
//	ajaxMyMoney(data)
})