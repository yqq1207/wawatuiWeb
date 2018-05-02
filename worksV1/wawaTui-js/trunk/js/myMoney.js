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
	  
	 //任意字符串 生成二维码  
		    //默认使用Canvas画图  
		    var codeImg = function(codeUrl){
		    	$('#code').qrcode(codeUrl);
		    	return $('#code').find('canvas')[0].toDataURL("image/jpg", 1.0);
		    }
		
			var dataPopup = 0;
			var qecodeImgUrl,storage = window.localStorage;
			$('.open-popupp').click(function(){
				console.log('dataPopup='+dataPopup)
				if(dataPopup) return;
				$.showLoading("正在加载...");
				setTimeout(function(){
					$.hideLoading();
					$.toptip('网络不佳，请重试', 'warning');
				},2000);
			})
		  /*查询娃娃币*/
		 //	  获取userId
					var userId = GetQueryString('userId');
					if(!userId){
						userId = 201919;
					}
					storage.setItem('wwtUserId',userId);/*存储wwtUserId到缓存中*/
					var userIdData = {
				 		'userId':userId  //真是数据
					};
				 	var ajaxMyMoney = function(dataInfo){//ajax获取娃娃币，以及邀请链接
						$.ajax({	
						 	type:"post",
						 	url:getAjaxUrl+"/api/getUser/getUserInfo",
						 	async:true,
						 	data:dataInfo,
						 	success:function(data){
						 		if(data.code !=0){
						 			dollCoin=0;
						 			dollCoinExchange=10;
						 			$('.money-all font').text(dollCoin);
						 			return;
						 		} 
						 		
						 		storage.setItem('cookieSkey',data.data.skey);
						 		
						 		var dollCoin,dollCoinExchange;
						 		if(data.code == 0){//成功
						 			dollCoin = data.data.dollCoin;
						 			dollCoinExchange = data.data.dollCoinExchange;//金币数量,金币和余额兑换比例
						 		}
						 		storage.setItem('dollCoinExchange',dollCoinExchange);//将金币和余额兑换比例存入缓存；
						 		storage.setItem('myDollCoin',dollCoin);/*存储娃娃币余额到缓存中*/
						 		$('.money-all font').text(dollCoin);
						 		qecodeImgUrl = codeImg(data.data.serverHost+'?userId='+dataInfo.userId);//生成二维码
						 	},
						 	error:function(error){
								var dataCode = 0;
								storage.setItem('myDollCoin',dataCode);/*存储到缓存中*/
						 		$('.money-all font').text(dataCode);
						 	}
						 	
						});
					 
					}
					ajaxMyMoney(userIdData);
						
					//	  获取userId
					var num = parseInt( Math.random()*3 + 1);
					var imgD = new Image();
					imgD.src = "../img/share"+num+".png";
					console.log(imgD.src)
					imgD.onload = function(){
						console.log(2223333)
					setTimeout(function(){
						var Wwidth = $(window).width(),Wheight = Wwidth*16/9;
						
						$('.close-popp').css({'width':Wwidth,'height':Wheight});
						$('#img_back').css({'width':Wwidth,'height':Wheight});
						
						
						var img_back = $('#img_back')[0];
						if(Wwidth > 380){
							img_back.width = Wwidth + 15;
							img_back.height = Wheight + 80;
						}
						if($(window).height() > 760){
							img_back.width = Wwidth + 15;
							img_back.height = Wheight - 10;
						}
						var img_back1 = img_back.getContext("2d");
						
//						var img_b = $('.close-popp')[num -1];
						var img_b = imgD;
						var img_ma = new Image();
						if(!qecodeImgUrl){
							qecodeImgUrl = codeImg(getAjaxUrl+'/?userId='+userId);//生成二维码
						}
						console.log(getAjaxUrl+'/?userId='+userId);
						img_ma.src = qecodeImgUrl;
						
						
						var drawImagee = function(a,b,c,d){
							
								img_back1.drawImage(img_b,0,0,parseInt(Wwidth + 15) ,parseInt(Wheight - 40));//先画出大图
								img_back1.drawImage(img_ma,Wwidth*a,Wheight*b,Wwidth*c,Wwidth*d);
								return img_back.toDataURL("image/jpg", 1.0);
							
							
								
						}
						
						
						var img_cc = new Image();
						
						img_cc.width = Wwidth;
						
						
							
							console.log('44444')
						
							img_ma.onload = function(){
	//						判断加载的哪一个图片
								if(num == 1){
									console.log(111111111)
									img_cc.src = drawImagee(0.679,0.668,0.33,0.333);
								}else if(num == 2){
									console.log(2222222222)
									img_cc.src =drawImagee(0.342,0.240,0.36,0.365);
								}else{
									console.log(3333333333)
									img_cc.src =drawImagee(0.655,0.651,0.357,0.369);
								}
							}
						
						
						img_cc.width = Wwidth;
						if($(window).height() > 670){
							img_cc.height = Wheight;
						}
						
						img_cc.onload = function(){
							
							
							dataPopup = 1;
							$('.open-popupp').click(function(){
								if(dataPopup){
									$.showLoading("正在加载...");
									$.hideLoading();
									$('#full').popup();
									var relativeTop = ($(window).height() - 637)/2;
									if(relativeTop <0){
										relativeTop = 0
									}
									$('#full .weui-popup__modal').css('top',relativeTop)
									
								}else return;
								
								
							})
							console.log('1')
							$('#full .weui-popup__modal').html(img_cc);
						}
					},1000)
				}	
				var timeOutEvent = 0;   
				$('.close-pop').on({
					touchstart:function(e){
						timeOutEvent = setTimeout("longPress()",1000);
					},
					touchend:function(e){
						clearTimeout(timeOutEvent); 
	            		if(timeOutEvent!=0){
			               $.closePopup()
			            }   
			            return false;   
					}
				});
				function longPress(){   
				    timeOutEvent = 0;   
				} 
})