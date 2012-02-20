/**
 * @author WJZ
 * ajax获取数据的对象
 */

define('CORE.ajaxData', function($, CORE){
		
	var ad = {}
	
	//$.ajaxSetup();
	
	ad.getUserData = function(){
		return {
			uuid:'0', 
			nick:'吴童鞋', 
			tx_url:'images/default.gif',
			status:'快放假啊...'
		};
	
	}
	
	ad.getContactData = function(){
		return { 
			groups : [
				{
					uuid:'0', 
					name:'软工0807', 
					contacts:[
						{uuid:0, nick:'空手道', status:'今天天气不错'},
						{uuid:2, nick:'w8ru', status:'今天天气不错'},
						{uuid:3, nick:'路口的说法', status:'今天天气不错'},
						{uuid:0, nick:'空手道', status:'今天天气不错'},
						{uuid:2, nick:'w8ru', status:'今天天气不错'},
						{uuid:3, nick:'路口的说法', status:'今天天气不错'}
					]
				},
				
				{
					uuid:'2',
					name:'老师'
				},
				
				{
					uuid:'1',
					name:'其他班级',
					contacts:[
						{uuid:1, nick:'福建省', status:'今天天气不错'},
						{uuid:0, nick:'空手道', status:'今天天气不错'},
						{uuid:2, nick:'w8ru', status:'今天天气不错'},
						{uuid:4, nick:'路口的说法', status:'今天天气不错'}
					]
				},
				{
					uuid:'4',
					name:'不认识'
				}
			]
		};
		
	}

	ad.getDiscusData = function(){
		return {
			discus : [
				{uuid:1,name:'讨论组1'},
				{uuid:2,name:'讨论组2'},
				{uuid:3,name:'讨论组3'}
			]		 
		};
	}
	
	return ad;
	
}, jQuery);