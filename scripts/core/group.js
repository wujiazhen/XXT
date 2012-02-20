/**
 * @author WJZ
 * 请导入Util.js，以及menu组件和dialogBox组件
 */

//分组类
define('CORE.Group', function($, CORE){	
	
	var Group = function(){
		return this.init.apply(this, arguments);
	}
	
	Group.defaults = {
		uuid : '',
		name : '未命名分组'
	};
	
	Group.showContacts = function(){
		this.showable = true;
		this.$group.find('.group_img').css({'background' : 'url(images/jtx_8.png)'});
		this.$contact_div.show();
	};
		
	//隐藏
	Group.hideContacts = function(){
		this.showable = false;
		this.$group.find('.group_img').css({'background' : 'url(images/jty_8.png)'});
		this.$contact_div.hide();
	}
	
	Group.prototype = {
		constructor : Group,
		
		init : function(options, $parent){
			var settings = $.extend({}, Group.defaults, options);
			
			this.uuid = settings.uuid;
			this.name = settings.name;
			this.contact_arr = [];	//保存分组里的联系人对象的引用的数组
			this.cl = arguments[2] || null;	//联系人列表对象的引用
				
			this.build($parent);
			this.initContacts(settings.contacts);
			this.bindPopMenu();
			
			return this;
		},
		
		build : function($parent){
			var _this = this;
			
			var $group = $('<div class="group"><div class="group_img">'+
					      '</div><p class="group_name">' + this.name + '</p></div>');
			$parent.append($group);
			_this.$group = $group;    
			
			var $contact_div = $('<div class="group_contacts"></div>');
			$parent.append($contact_div);
			_this.$contact_div = $contact_div;
				
			$group.click(function(e){
				if (_this.showable) {
					Group.hideContacts.call(_this);
				} else{
					Group.showContacts.call(_this);
				};
			});
			
			Group.hideContacts.call(this);
		},
		
		//初始化联系人
		initContacts : function(contact_data){
			var _this = this;
			
			if (contact_data) {				
				for(var i = 0, l = contact_data.length; i < l; i++){
					var p = new CORE.Contact.Class(contact_data[i], _this);//创建联系人
					
					_this.contact_arr.push(p);
					_this.$contact_div.append(p.$contact);
				}
			};
			
		},
		
		//添加联系人，需要参数为Contact对象
		addContact : function(contact){
			this.contact_arr.push(contact);
			this.$contact_div.append(contact.$contact);
		},
		
		//删除联系人，需要参数为联系人uuid
		deleteContact : function(contact_uuid){
			for (var i = 0, l = this.contact_arr.length; i < l; i++) {
				if (this.contact_arr[i].uuid === contact_uuid) {
					this.contact_arr.splice(i, 1);
					return;
				};
			};
		},
		
		//删除分组, 只能删除空分组
		deleteGroup : function(){
			if (this.contact_arr.length != 0) {
				alert('只能删除空分组');
				return;	
			};
			
			this.$group.remove();
		},
		
		bindPopMenu : function(){	
			var cm = CORE.PopMenu.group,
				_this = this;
			
			_this.$group.data('group', _this);
			
			cm.getItem(0).fn = function(target){
				_this.cl.showAddGroupDia();
			}
			
			cm.getItem(3).fn = function(target){
				target.data('group').deleteGroup();	
			}
			
			this.$group.bindPopMenu(cm);	
		}
		
	}
	
	/*
	$.Group = Group;
	
	
	//另一个分组类
	var SmallGroup = function(){
		return this.init.apply(this, arguments);
	}
	
	SmallGroup.prototype = {
		constructor : SmallGroup,
		
		init : function(group, $parent){
			this.uuid = group.uuid;
			this.name = group.name;
			
			this.build($parent);//alert(group.contact_arr.length);
			this.initContacts(group.contact_arr);
			
			group.small_group = this;
			
			return this;
		},
		
		build : function($parent){
			var _this = this;
			
			var $group = $('<div class="group"><div class="group_img">'+
					      '</div><p class="group_name">' + this.name + '</p></div>');
			
			$parent.append($group);
			_this.$group = $group;    
			
			var $contact_div = $('<div class="group_contacts"></div>');
			
			$parent.append($contact_div);
			_this.$contact_div = $contact_div;
				
			_this.initContacts();
			
			_this.$group.click(function(e){
				if (_this.showable) {
					Group.hideContacts.call(_this);
				} else{
					Group.showContacts.call(_this);
				};
				
				return false;
			});
			
			Group.hideContacts.call(_this);
		},
		
		//初始化联系人
		initContacts : function(contact_arr){
			var _this = this;
			
			if (contact_arr) {				
				for(var i = 0, l = contact_arr.length; i < l; i++){
					var p = new $.SmallContact(contact_arr[i]);//创建联系人
					_this.$contact_div.append(p.$contact);
				}
			};
		}
			
		
	}
	
	$.SmallGroup = SmallGroup;
	*/
	
	return {
		Class : Group
	};
	
}, jQuery, CORE);