$(function(){
	var storage = window.localStorage;
	var 
	myDollCoin = parseInt( storage.getItem('myDollCoin')),
	userId = storage.getItem('wwtUserId'),
	dollCoinExchange = storage.getItem('dollCoinExchange');//获取娃娃推的余额，wwtUserId,以及金币余额兑换比例
	if(!myDollCoin){
		myDollCoin = 0;
	};
	if(!dollCoinExchange){
		dollCoinExchange = 100;
	}
	console.log(myDollCoin)
	$('font.money-num').text(myDollCoin);
	$('font.change-money').text((myDollCoin/dollCoinExchange).toFixed(2));
	var codeDetial = {
		'111'  : '参数错误',
		'10014': '操作太频繁',
		'10020' :'登录过期',
		'10016' :'提取金额不能小于1元',
		'10011' :'该玩家不存在',
		'10012': '娃娃币不足'
	}
//	获取娃娃币余额以及红包奖励的方法
	var getUserInfo = function(url,changeMoneyData,money){
		
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data:changeMoneyData,
			success:function(data){
				if(data.code == 0){//成功
					$.toast("操作成功!");
					$('.input-money-num').val('');
					storage.setItem('myDollCoin',(myDollCoin - money));
					$('font.change-money').text(((myDollCoin - money)/dollCoinExchange).toFixed(2));//获取的红包
					$('.to-money-alt').eq(0).addClass('active').siblings().removeClass('active');
					$('font.money-num').text( (myDollCoin - money) );//娃娃币余额
					setTimeout(function(){
						window.location.href=document.referrer;
					},2800)
					
//					或者根据返回值来判断
//					var changeMoney = data.data.money,changeDollCoinExchange= data.data.dollCoinExchange,changeDollCoin = changeMoney*changeDollCoinExchange;
//					alert(changeMoney);
//					$('font.change-money').text(parseFloat( ((myDollCoin - changeDollCoin)/changeDollCoinExchange).toFixed(2)) );//获取的红包
//					$('.to-money-alt').eq(0).addClass('active').siblings().removeClass('active');
//					$('font.money-num').text(parseFloat( myDollCoin - changeDollCoin ));//娃娃币余额
				}else{
					var codeErrorDetial = '网络繁忙';
					if(data.code == 111 || data.code == -1){
						codeErrorDetial = codeDetial[111]
					}else if(data.code == 10014){
						codeErrorDetial = codeDetial[10014]
					}else if(data.code == 10020){
						codeErrorDetial = codeDetial[10020]
					}else if(data.code == 10016){
						codeErrorDetial = codeDetial[10016]
					}else if(data.code == 10011){
						codeErrorDetial = codeDetial[10011]
					}else if(data.code == 10012){
						codeErrorDetial = codeDetial[10012]
					}
					$.toast(codeErrorDetial,'cancel');
					$('.to-check-money').attr('id','');
					$('.to-money-alt').eq(0).addClass('active').siblings().removeClass('active');
					$('font.change-money').text( (myDollCoin/dollCoinExchange).toFixed(2) );
				}
				
			},
			error:function(error){
				console.log(error)
			}
		});
	};
	
//	var wwtData = {
//		userId:userId
//	};//用户id
//	getUserInfo(getAjaxUrl+'/api/getUser/exchangeRedPackage',wwtData);
	
	$('.box').css('height',$(window).height() - 30);
	/*判断是否为空*/
	var moneyNum = function(option){
		if(option.val() == ''){
			$('.to-check-money').attr('id','');
			$('.to-money-alt').eq(0).addClass('active').siblings().removeClass('active');
			$('font.change-money').text( (myDollCoin/dollCoinExchange).toFixed(2) );
		}else{
			$('.to-check-money').attr('id','');
			/*比较用户输入的提取金额和余额的*/
			if( parseFloat( option.val() ) > parseFloat( $('.to-money-alt01 .money-all').text() )){
				$('.to-money-alt02').html('<span style="color:red">可提取娃娃币不足</span>');
				$('.to-check-money').attr('id','');
			}else if(parseFloat( option.val() ) < 100){
				$('.to-money-alt02').html('<span style="color:red">请输入大于100的娃娃币数额</span>');
				$('.to-check-money').attr('id','');
				$('font.change-money').text( 0 );
			}
			else{
				$('.to-money-alt02').html('提取<font class="money-all">'+parseFloat( option.val() ).toFixed(2)+'</font>个娃娃币到余额');
				$('.to-check-money').attr('id','to-check-money');
				$('font.change-money').text( (parseFloat(option.val())/dollCoinExchange).toFixed(2) );//转换成人民币
			}
//			$('.to-money-alt02 .money-all').text(option.val());
			$('.to-money-alt').eq(1).addClass('active').siblings().removeClass('active');
		}
	};
	
	
	/*全部提取*/
	$('.check-all').click(function(){
		var num = parseFloat( $(this).parent().find('.money-all').text() );
		$('.input-money-num').val(num);
		moneyNum($('.input-money-num'));
		
	});
	
	/*手动输入金额*/
	$('.input-money-num').keyup(function(){
		moneyNum($(this))
//					if($(this).val() == ''){
//						console.log('是空')
//						$('.to-check-money').addClass('weui-btn_disabled')
//						
//					}else{
//						console.log('不是空')
//						$('.to-check-money').removeClass('weui-btn_disabled')
//					}
	});
	$(window).resize(function(){
		$('.box').css('height',$(window).height() - 30);
	});
	$('body').on('click','#to-check-money',function(){
		var money = parseFloat( $('.to-money-box .input-money-num').val());
		$(document).on("click", "#to-check-money", function() {
		    $.confirm("提取"+money+"个娃娃币到余额","提取娃娃币", function() {
		    	
		    	var wwtData = {
					'userId':userId,
					'money':parseFloat( (money/dollCoinExchange).toFixed(2)),
					'skey':storage.getItem('cookieSkey')
				};//用户id
		    	getUserInfo(getAjaxUrl+'/api/getUser/exchangeRedPackage',wwtData,money);
//		    	$.toast("操作成功!");
		    	$('.input-money-num').val('')
//		      $.toast("操作成功!");
		    }, function() {
		      //取消操作
		      $.toast("您取消了提取!",'cancel');
		    });
		});
	})
	
	
})
