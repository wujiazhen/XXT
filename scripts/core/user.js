/**
 * @author WJZ
 */

//用户
define('CORE.User', function($, CORE){	

	var user = {};
	
	user.$user = $('.user');
	
	user.initUser = function(){
		var user_data = CORE.ajaxData.getUserData();
		
		if(user_data == null) return; //获取用户数据失败
		
		user.$user.find('.user_tx').attr('src', user_data.tx_url || 'images/default.gif');
		user.$user.find('.user_nick').text(user_data.nick);
		user.$user.find('.user_status').text(user_data.status);
		
		bindPopMenu();
		bindUpdateStatus();
	}
	
	function bindPopMenu(){
		var cm = CORE.PopMenu.user;
		
		user.$user.find('.user_tx').bindPopMenu(cm);
	}
	
	function bindUpdateStatus(){
		user.$user.find('.user_status').click(function(){
			
			
		});
	}
	
	return user;

}, jQuery, CORE);
