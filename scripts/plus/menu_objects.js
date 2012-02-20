/**
 * @author WJZ
 */

//快捷菜单
define('CORE.PopMenu', function($, CORE){	

	//用户的快捷菜单
	var cm_user = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'设置个人资料'},
			{type:'NORMAL', txt:'更换头像'},
			{type:'NORMAL', txt:'系统设置'}
		]
	});
		
	//选择分组快捷菜单
	var cm_chose_group = new $.PopMenu({
		menu_arr : [], 
		filter_fn : function(menu, item){
			if (menu.target.data('contact').group.name == item.txt) {
				return true;
			}else{
				return false;
			};
		}
	});
	
	//联系人快捷菜单
	var cm_contact = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'发送即时消息'},
			{type:'MENU',   txt:'移动联系人至',  child_menu:cm_chose_group},
			{type:'NORMAL', txt:'发送文件'},
			{type:'NORMAL', txt:'移至黑名单'},
			{type:'NORMAL', txt:'删除好友'},
			{type:'LINE'},
			{type:'NORMAL', txt:'消息记录'},
			{type:'NORMAL', txt:'查看资料'}
		]
	});
	
	//分组快捷菜单
	var cm_group = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'创建分组'},
			{type:'NORMAL', txt:'隐藏该分组'},
			{type:'NORMAL', txt:'显示全部分组'},
			{type:'NORMAL', txt:'删除该分组'}
		]
	});
	
	//讨论组的快捷菜单
	var cm_discus = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'发送讨论组消息'},
			{type:'NORMAL', txt:'退出讨论组'}
		]
	});
	
	//联系人列表空白处的快捷菜单
	var cm_contact_blank = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'创建分组'}
		]
	});
	
	//讨论组列表空白处的快捷菜单
	var cm_discus_blank = new $.PopMenu({
		menu_arr : [ 
			{type:'NORMAL', txt:'创建讨论组'}
		]
	});

	return {
		user : cm_user,
		contact : cm_contact,
		group : cm_group,
		discus : cm_discus,
		contact_blank : cm_contact_blank,
		discus_blank : cm_discus_blank,
		chose_group : cm_chose_group
	};

}, jQuery, CORE);