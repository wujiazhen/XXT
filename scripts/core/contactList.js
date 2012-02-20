/**
 * @author WJZ
 * 联系人列表组件
 * 请导入Util.js，以及menu组件和dialogBox组件
 */

//联系人列表对象
define('CORE.ContactList', function($, CORE){	

	var cl = {};
	
	cl.group_arr = [];	//保存分组对象的数组
	cl.discus_arr = []; //保存讨论组对象的数组
	
	//初始化组件
	cl.contactListInit = function(){
		cl.$me = $('.cl_me_area');
		cl.$area = $('.cl_list_area');
		cl.$wraper = $('.cl_list_wraper');
		cl.$contacts = $('#contacts');		//联系人
		cl.$discus = $('#discus');			//讨论组
		
		cl.bulidContactList();
	}

	//获取数据，构建列表
	cl.bulidContactList = function(){
		
		//获取联系人数据
		var group_data = CORE.ajaxData.getContactData().groups;
		
		for(var i = 0, l = group_data.length; i < l; i++){
			cl.addGroup(group_data[i]);  //添加联系人分组
		}
		
		//获取讨论组数据
		var discus_data = CORE.ajaxData.getDiscusData().discus;
	
		for(g in discus_data){
			cl.addDiscus(discus_data[g]);  //添加讨论组分组
		}
		
		bindTabs();
		bindPopMenu();

	}
	
	bindTabs = function(){
		$('#contact_tab').click(function(){
			cl.$wraper.animate({'margin-left' : '0px'}, 100);
			if ($(this).hasClass('cl_tabs_active')) {
				return;
			}else{
				$(this).addClass('cl_tabs_active');
				$('#discus_tab').removeClass('cl_tabs_active');
			};
		});
		
		$('#discus_tab').click(function(){
			cl.$wraper.animate({'margin-left' : '-200px'}, 100);
			if ($(this).hasClass('cl_tabs_active')) {
				return;
			}else{
				$(this).addClass('cl_tabs_active');
				$('#contact_tab').removeClass('cl_tabs_active');
			};
		});
	}
	
	//添加分组
	cl.addGroup = function(data){
		var group = new CORE.Group.Class(data, cl.$contacts, cl);
		cl.group_arr.push(group);
		
		//更新选择分组的快捷菜单
		CORE.PopMenu.chose_group.addMenuItem({
			type : 'NORMAL',
			txt : group.name,
			fn : move
		});
		
		function move(target){
			target.data('contact').moveToOtherGroup(group);
		}
		
	}
	
	//添加讨论组
	cl.addDiscus = function(data){
		var discus = new CORE.Discus.Class(data, cl.$discus);
		cl.discus_arr.push(discus);
	}
	
	//显示添加分组的对话框
	cl.showAddGroupDia = function(){
		
	}
	
	//显示添加讨论组的对话框
	cl.showAddDiscusDia = function(){		
		CORE.choseContactDia();
	}
	
	//绑定快捷菜单
	function bindPopMenu(){
		var cm1 = CORE.PopMenu.contact_blank,
			cm2 = CORE.PopMenu.discus_blank;
		
		cm1.getItem(0).fn = function(){
			cl.showAddGroupDia();
		}
		
		cl.$contacts.bindPopMenu(cm1);
		
		cm2.getItem(0).fn = function(){
			cl.showAddDiscusDia();
		}
		
		cl.$discus.bindPopMenu(cm2);
	}

	//搜索联系人
	function bindSearchContact(){
		
	}

	return cl;

}, jQuery, CORE);
