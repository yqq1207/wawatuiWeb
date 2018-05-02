/*加载更多的方法*/
var WindowHeight = $(window).height();
	var searchMore = function(detialData,url){
		$.ajax({
			type:"post",
			data:detialData,
			url:url,
			async:true,
			success:function(datae){
				if(datae.code == 0 && datae.data.dollDetail.length !=0){
					$('.weui-cells').find('p.detialIsNull').css('display','none');
					var moreHtml = '';
					for(var i = datae.data.dollDetail.length -1; i>=0; i--){
						console.log('i='+i)
							var nowData = datae.data.dollDetail[i].timeStamp;
							nowData = new Date( nowData );
						 	var year=nowData.getFullYear(),
						 		month=(nowData.getMonth()+1) <=9 ? '0'+(nowData.getMonth()+1):(nowData.getMonth()+1),
						 		data=nowData.getDate() <=9 ? '0'+nowData.getDate():nowData.getDate(),
						 		hour=nowData.getHours() <=9 ? '0'+nowData.getHours():nowData.getHours(),
						 		minute=nowData.getMinutes() <=9 ? '0'+nowData.getMinutes():nowData.getMinutes(),
						 		second=nowData.getSeconds() <=9 ? '0'+nowData.getSeconds():nowData.getSeconds();
						 		
						 		
						 	var money = datae.data.dollDetail[i].dollCoin,textAddOr;
						 	
						 	if(money >= 0){
						 		textAddOr = '领取';
						 		moreHtml += '<div class="weui-cell">'+
								    '<div class="weui-cell__bd weui-cell_primary ">'+
								      '<p class="f16 c00im ">'+textAddOr+'</p>'+
								     ' <p class="f13 c7d">'+
								      	'<span>'+year+'-'+month+'-'+data+'</span> ' +
								      	'<span >'+hour+':'+minute+':'+second+'</span>'+
								      '</p>'+
								   ' </div>'+
								   ' <div class="weui-cell__ft f21 c0b0im addOr">'+money+'</div>'+
								  '</div>';
						 	}else{
						 		textAddOr = '消耗';
						 		moreHtml += '<div class="weui-cell">'+
								    '<div class="weui-cell__bd weui-cell_primary ">'+
								      '<p class="f16 c00im ">'+textAddOr+'</p>'+
								     ' <p class="f13 c7d">'+
								      	'<span>'+year+'-'+month+'-'+data+'</span> ' +
								      	'<span >'+hour+':'+minute+':'+second+'</span>'+
								      '</p>'+
								   ' </div>'+
								   ' <div class="weui-cell__ft f21 c00im addOr">'+money+'</div>'+
								  '</div>';
						 	}
			                
//						
					}
				}
				if(datae.data.dollDetail.length == 0){
					$('.weui-loadmore').html('<span class="weui-loadmore__tips">已经到底部了</span>');
				}
				
	  			$('.weui-cells').append(moreHtml);
	  			
	  			var weuiCellsHeight = parseFloat( $('.weui-cells').css('height') );
				if(weuiCellsHeight > WindowHeight - 60){
			//		$('.weui-loadmore__tips').text('加载更多')
					$('.weui-loadmore').show();
				}else{
			//		$('.weui-loadmore__tips').text('正在加载')
					$('.weui-loadmore').hide();
				}
				if($('.weui-cells').find('.weui-cell').length == 0){
					$('.weui-loadmore').hide();
					$('.weui-cells').html('<p class="detialIsNull" style="line-height:'+WindowHeight+'px;text-align:center;color:rgba(0,0,0,.6);background:#fbfbfb">这里空空如也，去别处看看吧</p>')
					
	  			}
			},
			error:function(error){
				console.log(error)
			}
		});
	  }
	
	
	/*判断是否需要加载滚动条*/
//	var WindowHeight = $(window).height(),weuiCellsHeight = parseFloat( $('.weui-cells').css('height') );
//	if(weuiCellsHeight > WindowHeight){
////		$('.weui-loadmore__tips').text('加载更多')
//		$('.weui-loadmore').show();
//	}else{
////		$('.weui-loadmore__tips').text('正在加载')
//		$('.weui-loadmore').hide();
//	}
	
	
//	判断页面是否为空
//	if($('.weui-cells').find('.weui-cell').length == 0){
//		$('.weui-cells').html('<p class="detialIsNull" style="line-height:'+WindowHeight+'px;text-align:center;color:rgba(0,0,0,.6);background:#fbfbfb">这里空空如也，去别处看看吧</p>')
//	}
	
	/*初始化正在加载的样式,判断是否可以加载下一页*/
	  var loading = false,morePage=1;
	  var storage = window.localStorage;
	  var 
	  	url = 'http://dbggm.imoyuu.com/api/getUser/getUserDollDetail',
	  	userId = storage.getItem('wwtUserId');
	  	
	  var detialData;
	  	//初始化每次加载的数量
	  var ajaxNumber =Math.ceil( $(window).height() / 62);
  	detialData = {
  		'userId':userId,
  		'page':1,
  		'number':ajaxNumber
  	};
	  searchMore(detialData,url);
	  $(document.body).infinite().on("infinite", function() {
	    if(loading) return;
	    morePage++;
	    loading = true;
	    detialData = {
	  		'userId':userId,
	  		'page':morePage,
	  		'number':ajaxNumber
	  	};
	    setTimeout(function() {
	      searchMore(detialData,url);
	      loading = false;
	    }, 2000);
	  });
	    