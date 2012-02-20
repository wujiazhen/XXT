/**
 * @author WJZ
 * 请导入Util.js，以及menu组件和dialogBox组件
 */

/**
 * 联系人
 * 在不同的上下文有不同的样式显示
 * 有如下几种类型：
 * 1.联系人列表中的联系人
 * 2.搜索结果列表中的联系人
 * 3.选择联系人列表中的联系人
 * 其他...
 */

define('CORE.Contact', function($, CORE){	
	
	var Contact = function(){
		return this.init.apply(this, arguments);
	}
	
	Contact.defaults = {
		uuid : '',
		nick : '',
		status : '',
		tx_url : 'images/default.gif' 
	};
	
	Contact.htmls = {
		mid : '<div class="contact contact_mid"><img class="contact_tx contact_tx_mid" />'+
			  '<div class="contact_info contact_info_mid"></div></div>',
		small : '<div class="contact contact_small"><img class="contact_tx contact_tx_small" />'+
				'<div class="contact_info contact_info_small"></div></div>'
	};
	
	Contact.prototype = {
		constructor : Contact,
		
		init : function(options, group){
			
			var settings = $.extend({}, Contact.defaults, options);
		
			this.uuid = settings.uuid;
			this.nick = settings.nick;
			this.status = settings.status;
			this.tx_url = settings.tx_url;
			this.group = group || null;   //设置联系人所属的分组,可能不存在
			
			this.build();
			this.bindPopMenu();
			
			return this;
		},
		
		build : function(){
			var $nick = $('<p><span class="contact_font_nick">' + this.nick + '</span></p>');
			var $status = $('<p><span class="contact_font_status">' + this.status + '</span></p>');
			 
			this.$contact = $(Contact.htmls.mid);
			this.$contact.find('.contact_tx').attr('src', this.tx_url);
			this.$contact.find('.contact_info').append($nick).append($status);
			
			return this;
		},
		
		//查看联系人资料
		checkContactInfo : function(){
			
		},
		
		//发起聊天
		startChat : function(){
			
		},
		
		//删除联系人
		deleteContact : function(){
			//this.$contact.remove();
		
			//删除所属分组中的引用
			if (this.group) {
				this.group.deleteContact(this.uuid);
			};
		},
		
		//移动至其他分组
		moveToOtherGroup : function(other_group){
			//var $clone_contact = this.$contact.clone(true);
			
			this.deleteContact();
			
			//this.$contact = $clone_contact;
			
			other_group.addContact(this);
		},
		
		bindPopMenu : function(){	
			var _this = this,
				cm = CORE.PopMenu.contact;
			
			//绑定对象
			_this.$contact.data('contact', _this);
			
			//绑定快捷菜单
			_this.$contact.bindPopMenu(cm);
			
			//设置快捷菜单的功能
			cm.getItem(0).fn = function(target, $item, n){
				target.data('contact').startChat();
			}
			
			cm.getItem(4).fn = function(target, $item, n){
				target.data('contact').deleteContact();
			}
			
			cm.getItem(5).fn = function(target, $item, n){
				target.data('contact').checkContactInfo();
			}
			
		}
		
	};

	//$.Contact = Contact;
	
	/*	
	//另一个联系人类
	var SmallContact = function(){
		return this.init.apply(this, arguments);
	}
	
	SmallContact.prototype = {
		constructor : SmallContact,
		
		init : function(contact){

			this.uuid = contact.uuid;
			this.nick = contact.nick;
			this.status = contact.status;
			this.tx_url = contact.tx_url;
			this.group = contact.group || null;   //设置联系人所属的分组,可能不存在
			
			this.build();
			contact.small_contact = this;
			
			return this;
		},
		
		build : function(){
			var $p = $('<p></p>');
			var $nick = $('<span class="contact_font_nick">' + this.nick + '</span>');
			var $status = $('<span class="contact_font_status">' + this.status + '</span>');
		
			this.$contact = $(Contact.htmls.small);
			this.$contact.find('.contact_tx').attr('src', this.tx_url);
			this.$contact.find('.contact_info')
			.append($p.append($nick).append($status));
			
			return this;
		}
	}
	*/
	//$.SmallContact = SmallContact;
	
	return {
		Class : Contact
	};
	
}, jQuery, CORE);